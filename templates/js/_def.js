define(function(){
 var G;
 var STORAGE;
 var state; 
 
    
    function init(params, Locstor /* aka Хранилище */){
      G=params; STORAGE=Locstor;
    //var test = params.context.test
    //начальные значения
      state = {
         status: 'off',
         level: 50, 
         } // Объект для хранения состояний
	
	 STORAGE.set(G.id, state) // Сохранение в локальном хранилище
        $(params.tabs).find('.work-tab').html('<div class="jack-header"></div>');
        local_unit();
        $(params.specialTab).find('.main_switcher .on-off').on('click',on_off);
  
        render();
//	console.log(G);
	
  }
  
  function local_unit(){
      
  }
  
  function on_off(){
      state=STORAGE.get(G.id);
//      console.log(state);
      
      switch(state.status){
          case 'on':{              
              state.status='off'
                  break;
          }
          case 'off':
          default:{
              state.status='on'
                      break;
              }
    }
      STORAGE.set(G.id, state) // Сохранение в локальном хранилище
      render();

  }
      function render(){
        state=STORAGE.get(G.id);
        console.log(state);

        switch(state.status){
            case 'on':{
                $(G.specialTab).find('.main_switcher .on-off').css({'background-position':'0px -45px'});
                $(G.specialTab).find('.main_switcher .i').css({'background-position':'-39px 0px'});
                $(G.specialTab).find('.switcher .jack').css({'background-position':'0px 0px'});

                    break;
            }
            case 'off':
            default:{
                $(G.specialTab).find('.main_switcher .on-off').css({'background-position':'0px 0px'});        
                $(G.specialTab).find('.main_switcher .i').css({'background-position':'-4px 0px'});
                $(G.specialTab).find('.switcher .jack').css({'background-position':'0px -182px'});

                        break;
                }
        }    
  }

    return init;
})