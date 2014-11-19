window.WebSocket = window.WebSocket || window.MozWebSocket;

var currentPlaylist = null

if(window.WebSocket) {
  var connection = new WebSocket('ws://' + window.location.hostname + ':3001/');

  connection.onmessage = function (message) {
    var json = JSON.parse(message.data)
	var time = timeFormat(json.result.time)	
	var totaltime = timeFormat(json.result.totaltime)	
	var timeRatio = getTimeRatio(json.result.time, json.result.totaltime)	
	setGauge(timeRatio)
    $('.control-r-media-center-bar-gauge').BarGauge({value: timeRatio})
	$('.control-r-media-center-time').text(time + '/' + totaltime)
	var fields = ['album', 'artist', 'title']
	if(isAnotherComposition(json)) $('.control-r-media-center-album-cover').html('<img src="/xbmc/thumbnail?"' + Math.random() + '>')	
	for(i in fields) setContent(json.result.item, fields[i])
	if(JSON.stringify(json.result.playlist) !== JSON.stringify(currentPlaylist)){
      currentPlaylist = json.result.playlist
	  var ul = $('.control-r-media-center-playlist ul')	
	  $(ul).empty()  
	  for(i in currentPlaylist) preparePlaylistLink(i, ul, currentPlaylist)
	}	
  }
}

function preparePlaylistLink(i, ul, pl){
	var li = $('<li/>').appendTo(ul)
	var a  = $('<a href="#">' + pl[i] + '</a>').appendTo(li)
	$(a).click(function(){$.get('/xbmc/play/' + i)})
}

function isAnotherComposition(obj){
  //var isAnother = true
  //isAnother &= obj.result.item.album  === $('.control-r-media-center-album').text()	  
  //isAnother &= obj.result.item.artist[0] === $('.control-r-media-center-artist').text()	  
  return true //isAnother
}

function setContent(obj, s){
  if(obj[s])$('.control-r-media-center-' + s).text(s == 'artist' ? obj[s][0] : obj[s])
}

function timeFormat(obj){
  return obj.minutes + ':' + obj.seconds
}

function getTimeRatio(t, tt){
  if(!t || !tt) return 0	
  return (parseInt(t.minutes) * 60 + parseInt(t.seconds)) / (parseInt(tt.minutes) * 60 + parseInt(tt.seconds))
}
