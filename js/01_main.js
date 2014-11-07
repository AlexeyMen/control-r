requirejs.config({
  waitSeconds: 30,		
//  urlArgs: "bust=" + (new Date()).getTime(),		
  baseUrl: 'js',
  paths: {
	jquery:        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
    jquery_ui:     'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
    jquery_mobile: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.1/jquery.mobile.min',
	jquery_wheel:  'vendor/jquery.mousewheel.min',
    mapbox:        'https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox',
    maplabel:      'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label',
	//underscore:    'http://underscorejs.org/underscore-min.js',
	//backbone:      'http://backbonejs.org/backbone-min',
	//local_storage: 'http//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.13/backbone.localStorage-min.js',
	local_storage: 'vendor/locstor.min',
	pages:         '20_pages',
	geoobjects:    '21_geoobjects',
	wheel:         '41_wheel',
	geomap:        '50_geomap',
	dragdrop:      '60_drag-n-drop',
	dialog:        '61_dialog',
	equipment:     '63_equipment',
	Chart:         'vendor/Chart.min',
	templates:     '../templates/js',
  },

  shim: {
    i18n:          {deps: ['jquery']},
    maplabel:      {deps: ['mapbox']},
    geomap:        {deps: ['maplabel']},
    wheel:         {deps: ['jquery_wheel']},
    dragdrop:      {deps: ['jquery_ui']},
    dialog:        {deps: ['local_storage']},
  }
})

if(window.top.location.hash){
   	window.top.location.hash = ''
   	window.top.location.reload(true)
}
else require(['pages'])

window.debug = true
