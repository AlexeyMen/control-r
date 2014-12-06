define(['boxes', 'css'], function(boxes, requireCss){
  requireCss('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.css')
  requireCss('https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label.css')
  var crPages = boxes.pages
  crPages['geo'].tunePanels = tunePanels
  crPages['geo'].fillLeftPanel = fillLeftPanel
  crPages['geo'].createCollapsible = createCollapsible
  crPages['geo'].prepareWidgets = function(page, main, header, leftPanel, rightPanel){
	  var anchs = $(header).find('a')
	  $(anchs[1]).remove()
	  $(rightPanel).remove()
	  var geoobjects = boxes.geoobjects 
	  fillLeftPanel(leftPanel, geoobjects, ['geo'], null)
	  $(page).on('pageshow', function(){
		  $(page).removeClass('hidden')
		  $(page).width($(window).width())
		  $(page).height($(window).height())
		  $(page).css({overflow: 'hidden'})
		  var mapDiv = $(page).find('[role=main]').height($(window).height())[0]		
		  $(mapDiv).css({overflow: 'hidden'})
		  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleHJ1MjAxNCIsImEiOiJJMHQ4NnFRIn0.3BBwGZ_YzX1lGX_yzSjcvg'
		  var map = L.mapbox.map(mapDiv, 'alexru2014.jdegnod6').setView([geoobjects.view.lat, geoobjects.view.lng], geoobjects.view.zoom)
		  for(var i in geoobjects){
			  if(i == 'view') continue
			  var val  = geoobjects[i]
			  var marker = L.marker([val.lat, val.lng]).bindLabel(val.label, {noHide: true}).addTo(map)
			  setMarkerClick(marker, i)
		  }
	  	  tunePanels(page)	
	  })
  }
})

function fillLeftPanel(leftPanel, geoobjects, excludeFromMenu, excludeFromGeo){
	var topLabel =  '<ul data-role="listview">' +
				    '<li data-icon="delete"><a href="#" data-rel="close" data-i18n-text="Settings">&nbsp;</a></li>' +
					'</ul><div class="cr-panel-gutter">'		
    $(topLabel).appendTo(leftPanel)					
	var ul = $(createCollapsible('List of objects', 'list-of-objects')).appendTo(leftPanel).find('ul')[0]
	for(var i in geoobjects){
	    if(i == 'view')	continue
		checkLi("<li><a href='#cr-page-" + i + "' data-cr-icon='" + geoobjects[i].icon + "' >" + geoobjects[i].label + "</a></li>", ul, excludeFromGeo)
    }
	$('<div class="cr-panel-gutter">').appendTo(leftPanel)
	ul = $('<ul data-role="listview">').appendTo(leftPanel)
	checkLi("<li><a  href='#cr-page-geo' data-i18n-text='Go to the map' data-cr-icon='go-map'></a></li>", ul, excludeFromMenu)
	checkLi("<li><a href='#cr-page-userdata'    data-i18n-text='Personal data' data-cr-icon='settings'></a></li>", ul, excludeFromMenu)
	checkLi("<li><a  href='#cr-page-support'    data-i18n-text='Technical support' data-cr-icon='support'></a></li>", ul, excludeFromMenu)
	checkLi("<li><a  href='#cr-page-media-plus' data-i18n-text='Media plus' data-cr-icon='media-plus'></a></li>", ul, excludeFromMenu)
}

function tunePanels(holder){
	var $winHeight = $(window).height();
	$(holder).find(".ui-panel").css({
		"min-height": "240px",
		"height"    : $winHeight + "px"
	}).mCustomScrollbar({
		mouseWheel:{ enable: true },
		theme: "light-thin",
		scrollInertia: 200
	});
}

$(window).resize(function() {
	tunePanels($(document))
})

function createCollapsible(title, role){
    var div = $("<div data-role='collapsible' data-inset='false' data-iconpos='right'>")
    if(role) $(div).attr('data-cr-role', role)		
	$("<h3 data-i18n-text='" + title + "'></h3>").appendTo(div)
	$("<ul data-role='listview'></ul>").appendTo(div)
	return div 
}

function checkLi(html, ul, excludeLi){
	for(var i in excludeLi){
	   	if(excludeLi && new RegExp('-' + excludeLi[i]).test(html)) return
	}
	$(html).appendTo(ul)
}

function setMarkerClick(m, h){
  m.on('click', function(){
    var hash = '#cr-page-' + h
	$.mobile.navigate(hash)
  })
}
