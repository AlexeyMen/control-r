define(['Chart'],function(Chart){
 var G;
 var STORAGE;
 var state; 
 var Chartjs;
  var chartoptions={
      scaleLineColor: "rgba(255,255,255,1)",
       scaleFontColor: "#FFF",
 };
 var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

    
    function init(params, Locstor /* aka Хранилище */){
      G=params; STORAGE=Locstor;
    //var test = params.context.test
    //начальные значения
      state = {
         status: 'off',
         wstatus: 'off',
         level: 50, 
         } // Объект для хранения состояний
	 $(G.dialog).dialog({width: 399, height: 420});
	 STORAGE.set(G.id, state) // Сохранение в локальном хранилище
        $(G.tabs).find('.work-tab').html('<div class="ms-header"></div>');
        local_unit();
        $(G.specialTab).find('.main_switcher .on-off').on('click',on_off);
  
        render();
      
//	console.log(G);
	
  }
  
  function local_unit(){
      
   $(G.specialTab).find('.mot-sensor .r-button').on('click',r_button);
   
   var ctx = $(G.specialTab).find('.draw-z').get(0).getContext("2d");
   var myBarChart = new Chart(ctx).Bar(data, chartoptions);


 // D.lineG( $(G.specialTab).find('.draw-z').get(0),userData,colors);


}

  

  
    function r_button(){
      state=STORAGE.get(G.id);
//      console.log(state);
      
      switch(state.wstatus){
          case 'on':{              
              state.wstatus='off'
                  break;
          }
          case 'off':
          default:{
              state.wstatus='on'
                      break;
              }
    }
      STORAGE.set(G.id, state) // Сохранение в локальном хранилище
      render();

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
                $(G.specialTab).find('.mot-sensor .sensor').css({'background-position':'0px 0px'});

                    break;
            }
            case 'off':
            default:{
                $(G.specialTab).find('.main_switcher .on-off').css({'background-position':'0px 0px'});        
                $(G.specialTab).find('.main_switcher .i').css({'background-position':'-4px 0px'});
                $(G.specialTab).find('.mot-sensor .sensor').css({'background-position':'0px -125px'});

                        break;
                }
        }
      switch(state.wstatus){
          case 'on':{              
                $(G.specialTab).find('.mot-sensor .r-button').css({'background-position':'0px -81px'});
                  break;
          }
          case 'off':
          default:{
                  $(G.specialTab).find('.mot-sensor .r-button').css({'background-position':'0px 0px'});
                      break;
              }
    }
  }

    return init;
})