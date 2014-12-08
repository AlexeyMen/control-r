define(function(){
	return function(dialog, device){
		var volumeSlider = $(dialog).find('.cr-volume-slider-wrap')[0]
		$(volumeSlider).volumeSlider()
		var pwrBtn = $(dialog).find('.cr-dialog-power button')[0]
		var bulbDiv = $(dialog).find('.cr-dimmerable-jack-bulb')[0]
		$(pwrBtn).bind('click', function(){
			var onPos  = '0px 0px'
			var offPos = '0px -100px'
			var currPos = $(bulbDiv).css('background-position')
			var wasOn = /-100px/.test(currPos)
			$(bulbDiv).css('background-position', wasOn ? onPos : offPos)
			var tab2 = $(dialog).find('.cr-dialog-tabs button')[1]
			$(tab2).trigger('click')
			if(wasOn){
				$(dialog).find('.cr-volume-slider-handle').css('bottom', 0)
				$(dialog).find('.cr-volume-slider-ratio').css('height', '1px')
				$(dialog).find('.cr-volume-scale-fg').css('width', '1px')
			}
		})
	}
})
