define(['boxes'], function(boxes){
  return function(){	
	  var stuff = $('#cr-stuff')[0]	
	  var pages = boxes.pages
	  for(i in pages){	
		var page = $('#cr-page-template').clone().attr('data-role', 'page').insertBefore(stuff)	
		setRefs(page, i, pages[i])
	  }
  }
})

function setRefs(page, i, obj){
  var id = $(page).attr('id')
  id = (id + '-' + i).replace('template-', '')
  $(page).attr('id', id)
  $(page).find('[data-role=header] a').each(function(){
    var href = $(this).attr('href')
    $(this).attr('href', href + '-' + i)
  })
  $(page).find('[data-role=panel]').each(function(){
    var id = $(this).attr('id')
    $(this).attr('id', id + '-' + i)
  })
  var main   = $(page).find('[role=main]')[0]
  var panels = $(page).find('[data-role=panel]')
  var header = $(page).find('[data-role=header]')[0]
  if(obj.prepareWidgets) obj.prepareWidgets(page, main, header, panels[0], panels[1])
  if(obj.title){
	$(page).attr('data-i18n-title', obj.title)
  }	  
}
