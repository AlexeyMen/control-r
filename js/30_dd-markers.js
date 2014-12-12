define(['boxes', 'css'], function(boxes, requireCss){
	requireCss('dialogs/css/main.css')
	var objs = boxes.geoobjects
	var eqps = boxes.equipment
	$('[data-role=page]').each(function(){
		var page = $(this)
		var id = $(page).attr('id').replace(/^cr-page-/, '')
		var place = objs[id]
		$(page).find('a[data-cr-eqgrp]').each(function(){
				var page = $(this).parents('[data-role=page]')[0]
				$(this).draggable({helper: 'clone', appendTo: page, revert: true})
				var anch = this
				$(this).dblclick(function(){
					setMarker(page, eqps, place, anch)
				})
		})
		$(page).droppable({
			drop: function(ev, ui){
				setMarker(page, eqps, place, ui.helper, ev)
			}
		})
	})
})

function setMarker(page, eqps, place, anch, ev){
	var grp = $(anch).data('cr-eqgrp')
	var categ = $(anch).data('cr-categ')
	var map = place.map
	var items = []
	for(var i in eqps){
		var item = eqps[i]
		if(item.group != grp || item.inUse) continue
		items.push(item)
	}
	if(!items.length){
		alert('В вашем комплекте оборудование\nданного типа отсутствует\n или все такие устройства\nуже привязаны к маркерам.')
		return
	}	
	var latLng = ev ? map.mouseEventToLatLng(ev) : map.getCenter()
	var cln = $('#cr-dialog-template').clone()
	$(cln).cri18n()
	if(!place.markerGroups) place.markerGroups = {}
	if(!place.markerGroups[grp]) place.markerGroups[grp] = new L.LayerGroup().addTo(map)
	var icon = L.divIcon({
		iconSize: [82,100],
		iconAnchor: [41,100],
		className: "cr-icon-" + grp,
		html: "<img src='img/markers/inactive.png' />",
	})
	var marker = new L.Marker(latLng, {icon: icon, draggable: true})
	place.markerGroups[grp].addLayer(marker)
	var opts = {group: grp, items: items, marker: marker, map: map, category: categ}
	$(cln).crDialog(page, opts)
}
