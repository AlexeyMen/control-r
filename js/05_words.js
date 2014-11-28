define(['boxes', 'jquery'], function(boxes){
	var words = boxes.words
	loadWords(null, words)
})

function loadWords(lang, words){
	if(words.errorOnLoad && lang && lang == 'en'){words.ready = true; return}
	if(!lang) lang = window.navigator.userLanguage || window.navigator.language
	lang = lang.toLowerCase().trim().match(/^[a-z]{2}/)[0]
	$.get('i18n/' + lang + '.txt', function(data){
		words.ready = true
		var sa = data.split(/[\r\n]/)
		for(i in sa){
			if(/^(\s+)?\#/.test(sa[i])) continue
			var saa = sa[i].split('=')
		if(!saa || saa.length < 2) continue
		var key = saa[0].trim()
		var val = saa[1].trim()
		words[key] = val
		} 
	}).fail(function(){
		words.errorOnLoad = true; loadWords('en', words)
	})
}
