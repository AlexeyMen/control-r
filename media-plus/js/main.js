define(['css', 'boxes'], function(requireCss, boxes){
  requireCss('media-plus/css/media-space.css')	
  var pages = boxes.pages	
  var mediaPlus = pages['media-plus']	
  if(!mediaPlus)  return	
  mediaPlus.prepareWidgets = function(page, main, header, leftPanel, rightPanel){
	  var pageContent = $("<div class='cr-media-space'>").appendTo(main)
	  var mediaLeft   = $('<div class="cr-media-left"/>').appendTo(pageContent)
	  var mediaCenter = $('<div class="cr-media-center"/>').appendTo(pageContent)
	  var mediaRight  = $('<div class="cr-media-right"/>').appendTo(pageContent)
	  var leftArray   = ['tv', 'dvd', 'audio', 'ir', 'projector']
	  var rightArray  = ['cameras', 'webcams', 'conditioners', 'curtains', 'garlands']
	  setButtons(leftArray, mediaLeft, mediaCenter)
	  setButtons(rightArray, mediaRight, mediaCenter)
	  var panels = $(page).find('[data-role=panel]')
	  $(rightPanel).remove()
	  var fillLeftPanel = pages['geo'].fillLeftPanel
      var objs = boxes.geoobjects
      fillLeftPanel(leftPanel, objs, ['media-plus'], null)			
  }	
})

function setButtons(arr, div, center){
  for(i in arr){
	var link = $('<div class="cr-icones-' + arr[i] + '"/>').appendTo(div)
	setClick(link, arr[i], center)	
  }
}

function setClick(link, s, center){
  switch(s){	
	  case 'conditioners':
	  case 'cameras':
	  case 'audio':
		  $(link).click(function(){require(s)(center)})  
		  break
  }
}
