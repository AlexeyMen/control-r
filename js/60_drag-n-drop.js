define(['geomap', 'geoobjects', 'dialog', 'equipment'], function(L, objs, Dialog, Equipment){
	$('a[data-eqgrp]').each(function(){
	  //var li = $(this).parent()
	  //var eqgrp = $(this).attr('data-eqgrp')
	  //$(li).addClass('control-r-icon-link').addClass('control-r-icon-' + eqgrp) 
	  $(this).draggable({helper: 'clone', appendTo: 'body', revert: true})
	})
    for(i in objs) if(i != 'view') setMap(L, i, objs, Dialog, Equipment)
})

function setMap(L, i, objs, Dialog, Equipment){
	var Icon = L.Icon.extend({options:{
		shadowUrl: '/img/markers/shadow.png',
		iconSize     : [82, 100],
		shadowSize   : [82, 15],
		iconAnchor   : [41, 95],
		shadowAnchor : [42, 48],
		shadowSize   : [136, 54],
		popupAnchor  : [0, -95]
	  }
	})
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
			var categ = $(ui.helper).attr('data-categ')
			loadWidgetsCss(grp)
			if(!Equipment.markers) Equipment.markers = {}
		    if(!Equipment.markers[grp]) Equipment.markers[grp] = new L.LayerGroup().addTo(objs[i].map)
		    var icon = new Icon({iconUrl: '/markers/' + categ + '/' + grp})
		    var marker = new L.Marker(objs[i].map.mouseEventToLatLng(ev), {icon: icon,draggable: true})
		    Equipment.markers[grp].addLayer(marker)
			Dialog(grp, objs[i], marker)
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
