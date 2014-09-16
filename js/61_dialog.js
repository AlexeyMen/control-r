define(['equipment', 'locstor'], function(Equipment, Locstor){
	return function(grp, context, marker){
	    var equipCount = Locstor.get('EquipmentCounter')
		if(!equipCount) equipCount = 0
        var defaultTitle = 'Новое устройство ' + equipCount++
        Locstor.set('EquipmentCounter', equipCount)
		var dlg = $('.control-r-dialog').clone().attr('class', '');
		var randomHrefs = [Math.random(), Math.random()];
		var tabAnchors  = $(dlg).find('ul a'); 
		var tabContents = $(dlg).find('.control-r-dialog-tab');
		for(var i = 0; i < 2; i++){
			$(tabAnchors[i]).attr('href', '#' + randomHrefs[i])
			$(tabContents[i]).attr('id',  '' + randomHrefs[i])
		}
 	    var tabs = $(dlg).find('.control-r-dialog-tabs').tabs()
        var dialog = $(dlg).dialog({width: 399, height: 330, title: defaultTitle})
		var tabDivs = $(dlg).find('.control-r-dialog-tab')
		var commonTab  = tabDivs[0]
		var specialTab = tabDivs[1]
		var inputs = $(dlg).find('input')
//		var idInput   = inputs[0]	  
		var nameInput = inputs[0]	
                
		var equipmentSelect = $(dlg).find('select')[0]
        for(i in Equipment){
          var val = Equipment[i]
		  if(val.group != grp) continue
		  $('<option value="' + i + '">' + val.name + '</option>').appendTo(equipmentSelect)	  
		}

        equipmentSelect.change(function(){
		  alert($(this).value())
		})
		/*
		$(idInput).keyup(function(){
			if($(idInput).val().length > 20){alert('Пожалуйста, будьте аккуратнее!'); return}
			var val = $(idInput).val()
			if(!Equipment || !val || !Equipment[val]) return false;
			if(!window.debug && Locstor.get(val)){alert('Это оборудование уже привязано к маркеру.'); return}  
			Locstor.set(val, {})
			$(idInput).prop('disabled', true)  
			var title = Equipment[val].name
			if(title){ 
				$(dlg).dialog('option', 'title', title);
				$(nameInput).val(title);
			}
			var params = {
			  id: val,
			  dialog: dialog,
			  tabs:   tabs,
			  commonTab: commonTab,
			  specialTab: specialTab,
			  marker: marker,
			  context: Equipment[val],
			  group: grp,
			}
			var toLoad = 'templates/' + grp
			$(specialTab).load('/' + toLoad + '.html', function(dat){	
				require([toLoad])
				var widgetLoader = setInterval(function(){
				  if(!require.defined(toLoad)) return
				  clearInterval(widgetLoader)
				  loadSpecial = require(toLoad)
				  loadSpecial(params, Locstor)	  
				}, 500)
			})
		})
		*/

		$(nameInput).keyup(function(){
			var val = $(nameInput).val().trim()
			if(!val) val = defaultTitle
			$(dlg).dialog('option', 'title', val)
		});
	}	
})
