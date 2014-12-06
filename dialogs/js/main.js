define(['css'], function(requireCss){
	$.fn.crDialog = function(page, opts){
		var noDeviceSelected = 'Сначала выберите оборудование из списка.'
		var device = null
		var isReady = function(){return !!device}
		var dlg = $(this)
		var marker = opts.marker
		marker.on('dblclick', function(){
			$(dlg).show()
		})
		var rmMark = $(dlg).find('.cr-dialog-remove-marker button')[0]
		$(rmMark).click(function(){
			if(!confirm('Вы уверены, что хотите удалить этот маркер?')) return
			opts.map.removeLayer(marker)
			if(device) device.inUse = false
			$(dlg).hide().remove()
		})
		$(dlg).tinyDraggable({handle: '.cr-dialog-header', exclude: '.cr-dialog-header button'})
		$(dlg).removeAttr('id')
		var pageX = ($(window).width() - $(this).width()) / 2
		var pageY = ($(window).height() - $(this).height()) / 2
		$(this).css({position: 'absolute', top: pageY + 'px', left: pageX + 'px'}).appendTo(page ? page : $('body'))
		$(dlg).find('.cr-dialog-header button').click(function(){
			$(dlg).hide()
		})
		var tabs    = $(dlg).find('.cr-dialog-tabs button')
		var tabDivs = $(dlg).find('.cr-dialog-tab-div')
		$(tabs).each(function(i, el){
			if(i > 0) $(tabDivs[i]).hide()
			$(el).click(function(){
				if(!isReady()){
					alert(noDeviceSelected)
				   	return
				}
				$(tabs).each(function(ii, elel){
					var cls = $(elel).attr('class')
					cls = cls.match(/^[^\s]+/)[0]
					cls += '-active'
					$(elel).removeClass(cls)
					$(tabDivs[ii]).hide()
					if(elel != el) return
					$(tabDivs[ii]).show()
					$(elel).addClass(cls)
				})

			})
		})
		$(dlg).find('.cr-dialog-power button').click(function(){
			if(!isReady()){alert(noDeviceSelected); return}
			var onPos  = '0px 0px'
			var offPos = '0px -34px'
			var currPos = $(this).css('background-position')
			var isOff = /-34px/.test(currPos)
			$(this).css('background-position', isOff ? onPos : offPos)
			$(this).css('color', isOff ? '#00fff2' : 'grey')
			$(this).css('text-align', isOff ? 'left' : 'right')
			$(this).text(isOff ? 'вкл.' : 'выкл.')
		})
		var grp = opts.group
		var nameInput = $(dlg).find('input')[0]
		var title = $(dlg).find('.cr-dialog-header label')[0]
		var eqpSelect = $(dlg).find('select')[0]
		$(nameInput).keyup(function(){
			var val = $(nameInput).val().trim()
			if(!val) val = defaultTitle
			$(title).text(val)
			$(eqpSelect).find(':selected').text(val)	
		});
                
		var items = opts.items
        for(i in items){
          var item = items[i]
		  $('<option>' + item.name + '</option>').appendTo(eqpSelect)	  
		}

        $(eqpSelect).change(function(){
			var n = eqpSelect.selectedIndex
			if(n == 0) return
			device = items[n - 1]
			device.inUse = true
			var name = device.name
			$(nameInput).val(name)
			$(title).text(name)
			$(eqpSelect).prop('disabled', true)  
			requireCss('dialogs/css/' + grp + '.css')
			$(tabDivs[1]).load('dialogs/' + grp + '.html', function(){
				var toLoad = 'dialogs/' + grp
				require([toLoad])
				var widgetLoader = setInterval(function(){
					if(!require.defined(toLoad)) return
					clearInterval(widgetLoader)
					loadSpecial = require(toLoad)
					loadSpecial(dlg, device)	  
				}, 500)
			})
		})
	}
})
