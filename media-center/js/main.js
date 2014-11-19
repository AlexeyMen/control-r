$(function(){
  $('#media-player .control-r-media-center-button').click(function(){
      var act = getAction(this)
	  $.ajax({
		type: 'GET',
		url: '/xbmc/control/' + act,
		dataType: 'json',
		contentType: 'application/json',
		success: function(dat){
		  //alert(JSON.stringify(dat))
		}		
	  })
  })
  $('.control-r-media-center-left-panel').height($(window).height())
  $('.control-r-media-template').css('visibility', 'visible')
  setGauge(0.01)	
  require(['socket'])
})

function setGauge(val){
  $('.control-r-media-center-bar-gauge').BarGauge({
	  backgroundColor: "#3d3d3d",           // Color of the Progress / Gauge Bar 
	  color: "#00fff2",     // Background color of Progress / Gauge Bar
	  width: "466px",      // Default width of Bar (Original Graphic Size of faceplate)
	  height: "72px",      // Default height of Bar
	  value: val,             // Value of Bar Gauge (Current Position)
	  goal: 1.00,          // Goal of Bar Gauge (Maximum Position)
	  //title: "Eric Clapton. Rockin' Chair",       // Default Title of Bar Gauge
	  title: "",       // Default Title of Bar Gauge
	  showTitle: true,         // If True show title
	  value_before: "",        // Default Value before text I.E. $1,000
	  value_after: "",         // Default Value Text end text I.E 1,000 USD
	  showValue: true,         // If True Show the value field in the Gauge Bar
	  valueColor: '#3cff00',       // Default Value Color 
	  //faceplate: "url(stylesheets/BarGauge/bar_graph.png) no-repeat", // Default locaiton of faceplate graphic other options (bar_graph(colorScale).png and bar_graph(gradient).png)
	  animSpeed: 400,      // Animation Speed can be string "slow","fast",etc... Or Integer
	  animType: "swing",       // Animation Type (jQuery Animation Methods)
	  decPlaces: 2,            // Default decimal places on the text field when showing value
	  thouSeparator: ',',      // Default Thousands seperator I.E. 1,000 or 1.000
	  decSeparator: '.'        // Default Decimal Separator I.E. 0.001 or 0,001
  })
}

function getAction(el){
  var classes = $(el).attr('class').split(/\s+/)
  for(var i in classes){
	var s = classes[i]  
    if(/-button$/.test(s)) continue
    return s.match(/[a-z0-9]+$/)[0]		
  }
}
