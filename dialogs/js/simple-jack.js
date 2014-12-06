define(function(){
	return function(dialog, device){
		var pwrBtn = $(dialog).find('.cr-dialog-power button')[0]
		var jackDiv = $(dialog).find('.cr-simple-jack')[0]
		$(pwrBtn).bind('click', function(){
			var onPos  = '0px 0px'
			var offPos = '0px -136px'
			var currPos = $(jackDiv).css('background-position')
			$(jackDiv).css('background-position', /-136px/.test(currPos) ? onPos : offPos)
			var tab2 = $(dialog).find('.cr-dialog-tabs button')[1]
			$(tab2).trigger('click')
		})
	}
})
