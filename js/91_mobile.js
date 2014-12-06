define(function(){
	$.mobile.navigate('#cr-page-geo')
	$('[data-role=page]').on('pageshow', function(){
		$(this).removeClass('hidden')
	})
	var spinner = require('spin')
	spinner.stop()
	var spinTarget = document.getElementById('cr-spinner');
	var spinParent = spinTarget.parentNode
	spinParent.removeChild(spinTarget)
	spinParent.parentNode.removeChild(spinParent)
})
