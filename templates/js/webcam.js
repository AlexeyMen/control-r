define(function(){
  return function(params, Locstor /* aka Хранилище */){
    var test = params.context.test
    alert('web');
	alert(test);
  }	
})

	/*
	 *
	 * Передаваемые параметры:
	 * =======================
	 *
     *	{
	 *	  id: 'webcam_01',         // - Идентификатор устройства
	 *	  dialog: dialog,          // - Диалог как таковой (jqueryui)
	 *	  tabs:   tabs,            // - Табы (jqueryui)
	 *	  commonTab: commonTab,    // - Общий таб (одинаковый для всех устройств)
	 *	  specialTab: specialTab,  // - Особый таб (для каждого вида оборудования)
	 *	  marker: marker,          // - Маркер на карте
	 *	  context: context,        // - описание данного объекта в файле equipment.js
	 *	}
	 *
	 * Как пользоваться хранилищем
	 * ===========================
	 *
	 * var state = {level: 50, isTurnedOn: false} // Объект для хранения состояний
	 *
	 * Locstor.set(widgetId, state) // Сохранение в локальном хранилище
	 *
	 * Locstor.get(widgetId) // Извлечение из локального хранилища
	 *
	 */
