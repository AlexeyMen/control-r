requirejs.config({
  waitSeconds: 30,		
  baseUrl: 'js',
  paths: {
	jquery:        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
    jquery_ui:     'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
    jquery_mobile: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.1/jquery.mobile.min',
    mapbox:        'https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox',
    maplabel:      'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-label/v0.2.1/leaflet.label',
    spinlib:       'vendor/spin.min',
    h5bp:          'vendor/h5bp',
	gauge:         'vendor/jquery.BarGauge',
    boxes:         '02_boxes',
    spin:          '03_spin',
    css:           '04_css',
    words:         '05_words',
    socket:        '06_socket',
    geomap:        '20_geomap',
    geoobjects:    '21_geoobjects',
    pages:         '29_pages',
    i18n:          '90_i18n',
    mobile:        '91_mobile',
    finish:        '99_finish',
    media:         '../media-plus/js/main',
    audio:         '../media-plus/js/audio',
    cameras:       '../media-plus/js/cameras',
    conditioners:  '../media-plus/js/conditioners',
  },

  shim: {
	mobile:       {deps: ['i18n', 'jquery_mobile']},
	i18n:         {deps: ['css', 'pages', 'geoobjects', 'media']},
	media:        {deps: ['geomap', 'audio', 'cameras', 'conditioners']},
	audio:        {deps: ['gauge']},
    geomap:       {deps: ['maplabel']},
    geoobjects:   {deps: ['geomap']},
    maplabel:     {deps: ['mapbox']},
    socket:       {deps: ['boxes']},
  }
})

if(window.top.location.hash){
   	window.top.location.hash = ''
   	window.top.location.reload(true)
}
else require(['h5bp', 'words', 'spin', 'socket'])
