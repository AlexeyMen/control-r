var request = require('request')

var xbmcProxy = request.defaults({
  method: 'POST',
  auth: {
	'user': 'xbmc',
	'pass': 'AlexUrus',
  },
})

var xbmcImageProxy = request.defaults({
  method: 'GET',
  auth: {
	'user': 'xbmc',
	'pass': 'AlexUrus',
  },
})

var notifyByWebsocket
var currentPlaylist = null
var currentPosition = -1

module.exports = function(done){
  notifyByWebsocket = this.notifyByWebsocket	
  this.xbmcRequest = xbmcRequest
  this.xbmcImageRequest = xbmcImageRequest
  this.xbmcPlayRequest = xbmcPlayRequest
  done()
}

function xbmcPlayRequest(pos, res){
  var obj = {"jsonrpc": "2.0", "method": "Player.GoTo", "params": {to: parseInt(pos),}, "id": 1}
  xbmcRequest(obj, res)
}

function xbmcImageRequest(req, res){
  if(!currentPlaylist || currentPosition  < 0){res.json({'no': 'player'}); return} 	
  var path = currentPlaylist.result.items[currentPosition].thumbnail	
  path = path.replace('image://', '')
  path = escape(path)
  //res.json({all: 'right'})  
  xbmcImageProxy({url: 'http://192.168.3.60:8080/image/image://' + path}).pipe(res)
}	  

function xbmcRequest(obj, resp, func){
	if(/^Play/.test(obj.method)) clarifyPlayer(obj, resp, func) 
	else sendRequest(obj, resp, func)	
}	  

function clarifyPlayer(obj, resp, func){
	var preObj = {"jsonrpc":"2.0","method":"Player.GetActivePlayers","id":1} 
	xbmcProxy({
		url: 'http://192.168.3.60:8080/jsonrpc?' + preObj.method,
		json: preObj,
	  }, 
	  function(err, _res, dat){
		if(err && resp){resp.json(err); return}
		if(err){console.log(err); return}
		var arrLen = dat.result.length
		if(arrLen == 0 && resp){resp.json(dat); return}
		if(arrLen == 0) {
			//currentPlaylist = null
			currentPosition = 0
			console.log('No active player.') 
			return
		}
		if(!obj.params) obj.params = {}
		if(/^Player/.test(obj.method))obj.params.playerid = dat.result[0].playerid
		if(/^Playlist/.test(obj.method))obj.params.playlistid = dat.result[0].playerid
        //console.log(obj)
		sendRequest(obj, resp, func)
	})
}

function sendRequest(obj, resp, func){
	xbmcProxy({
		  url: 'http://192.168.3.60:8080/jsonrpc?' + obj.method,
		  json: obj,
	  }, 
	  function(err, _res, dat){
		if(func){func(err, dat); return}
		if(resp){resp.json(err ? err : dat); return}
		if(err)console.log(err)
	  }
	)
}

var playInterval = setInterval(function(){
  var plist = {"jsonrpc": "2.0", "method": "Playlist.GetItems", "params": { "properties": ["file", "title", "album", "artist", "duration", "thumbnail"] }, "id": 1}
  var prop  = {"jsonrpc":"2.0","method":"Player.GetProperties","id":1,"params":{"properties":["playlistid","speed","position","totaltime","time"]}}
  xbmcRequest(plist, null, function(err, pldat){
    if(err){console.log(err); return} 
	setTimeout(function(){
		if(!currentPlaylist) return
		xbmcRequest(prop, null, function(err, dat){
		  if(err) return	
		  var pos = parseInt(dat.result.position)
		  currentPosition = pos	
		  dat.result.item = {} 
		  dat.result.item.artist = currentPlaylist.result.items[pos].artist 
		  dat.result.item.album  = currentPlaylist.result.items[pos].album 
		  dat.result.item.title  = currentPlaylist.result.items[pos].title 
	      var plArr = []
	      if(currentPlaylist) for(i in pldat.result.items) plArr.push(currentPlaylist.result.items[i].title) 
		  dat.result.playlist = plArr 
		  notifyByWebsocket(dat)
		})
	}, 500)
	if(JSON.stringify(currentPlaylist) !== JSON.stringify(pldat)) currentPlaylist = pldat
  })
}, 3000)
