$.fn.cri18n = function(){
  var words = require('boxes').words	
  $(this).find('[data-i18n-title], [data-i18n-text], [data-i18n-placeholder]').each(function(){
	  var key = $(this).attr('data-i18n-title') || $(this).attr('data-i18n-text') || $(this).attr('data-i18n-placeholder')
	  var val = words[key] || key
	  if($(this).attr('data-i18n-title'))       $(this).attr('title',       val).attr('data-title', val)	
	  if($(this).attr('data-i18n-placeholder')) $(this).attr('placeholder', val)	
	  if($(this).attr('data-i18n-text'))        $(this).text(val)	
  })
}

define(['boxes', 'pages', 'css'], function(boxes, preparePages, requireCss){
	preparePages(boxes.pages)
	$('[data-role=page]').cri18n()
	requireCss('http://code.jquery.com/mobile/1.4.3/jquery.mobile-1.4.3.min.css')
	//requireCss('css/cr-restyle.min.css')
	requireCss('css/cr-restyle.css')
})


