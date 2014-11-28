define(['boxes'], function(boxes){
	var objs = boxes.geoobjects
	for(var i in objs){
		if(i == 'view') continue
		prepareGeoobject(boxes, i)
	}
})

function prepareGeoobject(boxes, i){
	var pages = boxes.pages
	var objs = boxes.geoobjects
	var geoPage = {}
	pages[i] = geoPage
	geoPage.prepareWidgets = function(page, main, header, leftPanel, rightPanel){
		$(header).find('h1').text(objs[i].label)
		var fillLeftPanel = pages['geo'].fillLeftPanel
        fillLeftPanel(leftPanel, objs, null, [i])			
		var createCollapsible = pages['geo'].createCollapsible
		var clps = 
		$(page).on('pageshow', function(){
			$(page).removeClass('hidden')
			$(page).width($(window).width())
			$(page).height($(window).height())
			$(page).css({overflow: 'hidden'})
			var mapDiv = $(page).find('[role=main]').height($(window).height())[0]		
			$(mapDiv).css({overflow: 'hidden'})
			var uuid = objs[i].schemes[0].uuid
			var tileLayer = L.tileLayer('img/schemes/' + uuid + '/{z}/{x}_{y}.png')
			var tilesArray = []  
			tilesArray.push(tileLayer)
			objs[i].map = L.map(mapDiv, {doubleClickZoom: null, attributionControl: null, zoomControl: null, layers: tilesArray, zoom: 3, minZoom: 3, maxZoom: 4, center: [0, 0]})   
		})
	}	
}
