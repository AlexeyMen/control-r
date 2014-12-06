define(['boxes'], function(boxes){
	var objs = boxes.geoobjects
	for(var i in objs){
		if(i == 'view') continue
		prepareGeoobject(boxes, i)
	}
})

function prepareGeoobject(boxes, objId){
	var pages = boxes.pages
	var objs = boxes.geoobjects
	var geoPage = {}
	pages[objId] = geoPage
	geoPage.prepareWidgets = function(page, main, header, leftPanel, rightPanel){
		$(header).find('h1').text(objs[objId].label)
		var fillLeftPanel = pages['geo'].fillLeftPanel
		var tunePanels = pages['geo'].tunePanels
        fillLeftPanel(leftPanel, objs, null, [objId])			
		var rooms = objs[objId].rooms
		var createCollapsible = pages['geo'].createCollapsible
		var objList = $(leftPanel).find('[data-cr-role=list-of-objects]')[0]
		if(rooms.length > 1){
			var clps = createCollapsible('List of rooms', 'list-of-rooms')
			var ul = $(clps).find('ul')[0]
			for(var i in rooms){
				var room = rooms[i]
				$('<li><a href="#" data-scheme-dir="' + room.schemeDir + '">' + room.label + '</a></li>').appendTo(ul)
			}
			$(clps).insertBefore(objList)	
		}
		var eqpCategs = boxes.equipmentCategories
		var roomList = $(leftPanel).find('[data-cr-role=list-of-rooms]')
		if(!roomList || roomList.length == 0) roomList = objList
		for(var i in eqpCategs){
			var clps = createCollapsible(eqpCategs[i].label, i)
			var ul = $(clps).find('ul')[0]
			var groups = eqpCategs[i].groups
			groups.forEach(function(eqpLabel){
				var eqpGrp = eqpLabel.toLowerCase().replace(/[\s\/]/, '-')
				var li = $('<li>').appendTo(ul)
				var anch = $('<a href="#" data-cr-categ="' + i + '" data-i18n-text="' + eqpLabel + '" data-cr-eqgrp="' + eqpGrp + '">&nbsp;</a>').appendTo(li)
			})
			$(clps).insertBefore(roomList)
		}	
		$(page).on('pageshow', function(){
			$(page).removeClass('hidden')
			$(page).width($(window).width())
			$(page).height($(window).height())
			$(page).css({overflow: 'hidden'})
			var mapDiv = $(page).find('[role=main]').height($(window).height())[0]		
			$(mapDiv).css({overflow: 'hidden'})
			var uuid = rooms[0].schemeDir
			var tileLayer = L.tileLayer('img/schemes/' + uuid + '/{z}/{x}_{y}.png')
			var tilesArray = []  
			tilesArray.push(tileLayer)
			objs[objId].map = L.map(mapDiv, {doubleClickZoom: null, attributionControl: null, zoomControl: null, layers: tilesArray, zoom: 3, minZoom: 3, maxZoom: 4, center: [0, 0]})   
	  	  	tunePanels(page)	
		})
	}	
}

