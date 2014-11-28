define(['boxes'], function(boxes){
	var wordsInterval = setInterval(function(){
	  var words = boxes.words	
	  if(!words.ready) return
	  clearInterval(wordsInterval)	
	  require(['mobile'])	
	}, 500)
})
