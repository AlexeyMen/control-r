define(['jquery_mobile'], function(){
	$(function(){	  
	  geoPageDivs = $('.control-r-hide-on-start').css('visibility', 'visible')
	  $.mobile.loading( 'show', {
		text: 'foo',
		textVisible: false,
		theme: 'a',
		html: ""
	  });
      require(['wheel', 'geomap', 'dragdrop', 'media_plus'])
	})
})

