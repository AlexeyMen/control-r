define(['geomap', 'geoobjects', 'dialog', 'equipment'], function(L, objs, Dialog, Equipment){
    for(var i in objs) {
	  if(i != 'view') setMap(L, objs, Dialog, Equipment, i)
	}
})

function setMap(L, objs, Dialog, Equipment, i){
	  var page = $('#page-' + i)
	  $(page).on('pageshow', function(){
		if(objs[i].map) return
		var mapDiv = $(page).find('.map-of-object')[0]
		$(mapDiv).height($(window).height() - 44).css({overflow: 'hidden'})
		var uuid = objs[i].schemes[0].uuid
		var tileLayer = L.tileLayer('img/schemes/' + uuid + '/{z}/{x}_{y}.png')
		var tilesArray = []  
		tilesArray.push(tileLayer)
		objs[i].map = L.map(mapDiv, {doubleClickZoom: null, attributionControl: null, zoomControl: null, layers: tilesArray, zoom: 3, minZoom: 3, maxZoom: 4, center: [0, 0]})   
        setDragables(page, L, objs, Dialog, Equipment, i)
        setDropable (mapDiv, L, objs, Dialog, Equipment, i)
    })
}

function setDropable(mapDiv, L, objs, Dialog, Equipment, i){
	var map = objs[i].map
	$(mapDiv).droppable({
		drop: function(ev, ui){
			if(!$(ui.helper).is('[data-eqgrp]')) return 
			var grp = $(ui.helper).attr('data-eqgrp')
			var categ = $(ui.helper).attr('data-categ')
			var latLng = map.mouseEventToLatLng(ev)
			setMarker(L, objs, Dialog, Equipment, latLng, categ, grp, i)
		}
	})
}

function setDragables(page, L, objs, Dialog, Equipment, i){
	var map = objs[i].map
	$(page).find('a[data-eqgrp]').each(function(){
			$(this).draggable({helper: 'clone', appendTo: 'body', revert: true})
			$(this).dblclick(function(){
				var grp = $(this).attr('data-eqgrp')
				var categ = $(this).attr('data-categ')
				var latLng = map.getCenter()
				setMarker(L, objs, Dialog, Equipment, latLng, categ, grp, i)
			})
	})
}	

function setMarker(L, objs, Dialog, Equipment, latLng, categ, grp, i){
  var Icon = L.Icon.extend({options:{
	  shadowUrl: null,
	  iconSize     : [82, 100],
	  iconAnchor   : [41, 95],
	  popupAnchor  : [0, -95]
    }
  })
  loadWidgetsCss(grp)
  var subPath = '/markers/' + categ + '/' + grp
  var path = /open/.test(window.location.hostname) ? '/img' + subPath + '.png' : subPath	
  var icon = new Icon({iconUrl: path + '?inactive=true'})
  var activeIcon = new Icon({iconUrl: path})
  if(!objs[i].markerGroups) objs[i].markerGroups = {}
  if(!objs[i].markerGroups[grp]) objs[i].markerGroups[grp] = new L.LayerGroup().addTo(objs[i].map)
  var marker = new L.Marker(latLng, {icon: icon,draggable: true})
  objs[i].markerGroups[grp].addLayer(marker)
  marker.on('dblclick', function(){
    if(marker.dialog){$(marker.dialog).dialog('open'); return}
    Dialog(grp, objs[i], marker, activeIcon)
  })
}

function loadWidgetsCss(href) {
	var cssLinks = $('link[data-css-id=' + href + ']')
    if(cssLinks.length > 0) return		
	var cssLink = $("<link data-css-id='" + href + "'rel='stylesheet' type='text/css' href='templates/css/" + href + ".css'>");
	$("head").append(cssLink); 
};
