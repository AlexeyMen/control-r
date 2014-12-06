define(['boxes', 'css'], function(boxes, requireCss){
	requireCss('dialogs/css/main.css')
	var objs = boxes.geoobjects
	var eqps = boxes.equipment
	$('a[data-cr-eqgrp]').each(function(){
			//$(this).draggable({helper: 'clone', appendTo: 'body', revert: true})
			$(this).dblclick(function(){
				var page = $(this).parents('[data-role=page]')[0]
				var id = $(page).attr('id').replace(/^cr-page-/, '')
				var place = objs[id]
				var map = place.map
				var grp = $(this).attr('data-cr-eqgrp')
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
				//var categ = $(this).attr('data-cr-categ')
				var cln = $('#cr-dialog-template').clone()
				$(cln).cri18n()
				if(!place.markerGroups) place.markerGroups = {}
				if(!place.markerGroups[grp]) place.markerGroups[grp] = new L.LayerGroup().addTo(map)
				var latLng = map.getCenter()
				var marker = new L.Marker(latLng, {/*icon: icon,*/draggable: true})
				place.markerGroups[grp].addLayer(marker)
				var opts = {group: grp, items: items, marker: marker, map: map}
				$(cln).crDialog(page, opts)
			})
	})
})
