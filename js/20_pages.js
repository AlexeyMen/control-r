define(['geoobjects', 'jquery'], function(Geoobjects){
	window.control_r_geoobjects = Geoobjects	
	var geoPage = $('#geo-page')
	var geoObjectsList = $('#geo-objects ul')
	var ul = $('[data-geo-objects] ul')
	var pageTempl = $('.page-template')[0]
	for(i in Geoobjects){
		if(i == 'view') continue
		var val = Geoobjects[i]
		var li = $('<li></li>').appendTo(geoObjectsList)
		var hash = 'page-' + i
		$(li).addClass('control-r-icon').addClass('control-r-icon-' + val.icon)
		$('<a></a>').appendTo(li).text(val.label).attr('href', '#' + hash)
		var page = $(pageTempl).clone().insertAfter(geoPage).attr('id', hash).attr('data-title', val.label)
        createGeoObjectsList(page, Geoobjects, i)
		var panels  = $(page).find('[data-role=panel]')
		var anchors = $(page).find('div[data-role=header] a')
		for(j = 0; j < 2; j++){
		  var id = $(panels[j]).attr('id')
		  $(panels[j]).attr('id', id + '-' + i)
		  $(anchors[j]).attr('href', '#' + id + '-' + i)
		}
	}
    //$(geoObjectsList).listview('refresh')
    //$('li.control-r-icon, li[data-eqgrp]').attr('data-icon', false)
	$('a.control-r-icon-props').css('background-color', '#1d1d1d')
    $('li').attr('data-icon', false)
	require(['30_i18n'])
})

function createGeoObjectsList(page, geoobjs, id){
  var ul  = page.find('[data-geo-objects] ul')
  for(i in geoobjs){
	if(i == 'view' || i == id) continue  
	var val = geoobjs[i]	
    var li  = $('<li></li>').appendTo(ul)
    $(li).addClass('control-r-icon').addClass('control-r-icon-' + val.icon)
    $('<a></a>').appendTo(li).text(val.label).attr('href', '#page-' + i)
  }
}
