define(['boxes'], function(boxes){
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	var host = window.location.hostname
	var isGithub = /(open)|(github)/.test(host)
	if(!window.WebSocket || isGithub) return
	var targets = boxes.socketTargets	
	var connection = new WebSocket('ws://' + host + ':3001/');
	connection.onmessage = function (message) {
		var json = JSON.parse(message.data)
		var target = json.target		
		if(!target || !targets[target] || typeof targets[target] !== 'function') return
		targets[target](json)	
	}
})
