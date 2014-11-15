define(['geomap', 'geoobjects', 'dialog', 'equipment'], function(L, objs, Dialog, Equipment){
	var Icon = L.Icon.extend({options:{
		shadowUrl: null,
		iconSize     : [82, 100],
		iconAnchor   : [41, 95],
		popupAnchor  : [0, -95]
	  }
	})
    for(i in objs) if(i != 'view') setMap(L, i, objs, Dialog, Equipment, Icon)
	$('a[data-eqgrp]').each(function(){
	  $(this).draggable({helper: 'clone', appendTo: 'body', revert: true})
	  $(this).dblclick(function(){
		var page = $(this).parents('[data-role=page]')   
		var id = $(page).attr('id').match('[a-z0-9]+$')[0]
		var grp = $(this).attr('data-eqgrp')
		var categ = $(this).attr('data-categ')
		var map = objs[id].map
		var latLng = map.getCenter()
		setMarker(map, latLng, Equipment, Icon, categ, grp, L, objs, Dialog)
		//var icon = new Icon({iconUrl: getIconPath('/markers/' + categ + '/' + grp) + '?inactive=true'})
		//var marker = new L.Marker(latLng, {icon: icon,draggable: true}).addTo(map)
	  })
	})
})

function setMarker(map, latLng, Equipment, Icon, categ, grp, L, objs, Dialog){
  var subPath = '/markers/' + categ + '/' + grp
  var path = /open/.test(window.location.hostname) ? '/img' + subPath + '.png' : subPath	
  var icon = new Icon({iconUrl: path + '?inactive=true'})
  var activeIcon = new Icon({iconUrl: path})
  if(!Equipment.markers) Equipment.markers = {}
  if(!Equipment.markers[grp]) Equipment.markers[grp] = new L.LayerGroup().addTo(objs[i].map)
  //var marker = new L.Marker(latLng, {icon: icon,draggable: true}).addTo(map)
  var marker = new L.Marker(latLng, {icon: icon,draggable: true})
  //marker.setActive = function(){
  //  marker.setIcon(activeIcon)  
  //}	  
  Equipment.markers[grp].addLayer(marker)
  marker.on('dblclick', function(){
    if(marker.dialog){$(marker.dialog).dialog('open'); return}
    Dialog(grp, objs[i], marker, activeIcon)
  })
}

function setMap(L, i, objs, Dialog, Equipment, Icon){
	var page = $('#page-' + i)
	$(page).on('pageshow', function(){
	    var mapDiv = $(page).find('.map-of-object')[0]
	    $(mapDiv).height($(window).height() - 44).css({overflow: 'hidden'})
	    var uuid = objs[i].schemes[0].uuid
	    var tileLayer = L.tileLayer('img/schemes/' + uuid + '/{z}/{x}_{y}.png')
	    var tilesArray = []  
	    tilesArray.push(tileLayer)
	    objs[i].map = L.map(mapDiv, {doubleClickZoom: null, attributionControl: null, zoomControl: null, layers: tilesArray, zoom: 3, minZoom: 3, maxZoom: 4, center: [0, 0]})   
		$(mapDiv).droppable({
		  drop: function(ev, ui){
		    if(!$(ui.helper).is('[data-eqgrp]')) return 
			var grp = $(ui.helper).attr('data-eqgrp')
			loadWidgetsCss(grp)
			var categ = $(ui.helper).attr('data-categ')
			var map = objs[i].map
		    var latLng = map.mouseEventToLatLng(ev)
		    setMarker(map, latLng, Equipment, Icon, categ, grp, L, objs, Dialog)
			//if(!Equipment.markers) Equipment.markers = {}
		    //if(!Equipment.markers[grp]) Equipment.markers[grp] = new L.LayerGroup().addTo(objs[i].map)
		    //var icon = new Icon({iconUrl: '/markers/' + categ + '/' + grp})
		    //var marker = new L.Marker(objs[i].map.mouseEventToLatLng(ev), {icon: icon,draggable: true})
		    //Equipment.markers[grp].addLayer(marker)
			//Dialog(grp, objs[i], marker)
		  }
		})
	})
}

function loadWidgetsCss(href) {
	var cssLinks = $('link[data-css-id=' + href + ']')
    if(cssLinks.length > 0) return		
	var cssLink = $("<link data-css-id='" + href + "'rel='stylesheet' type='text/css' href='templates/css/" + href + ".css'>");
	$("head").append(cssLink); 
};
