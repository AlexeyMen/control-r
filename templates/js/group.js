define(function(){
 var G;
 var STORAGE;
 var state; 
  var elem;
 
   var ep=new Array();
    
    function init(params, Locstor /* aka Хранилище */){
      G=params; STORAGE=Locstor;
    //var test = params.context.test
    //начальные значения
      state = {
         status: 'off',
         level: 50, 
         } // Объект для хранения состояний
	
	 STORAGE.set(G.id, state) // Сохранение в локальном хранилище
        $(G.tabs).find('.work-tab').html('<div class="group-header"></div>');
        $(G.specialTab).find('.main_switcher .on-off').on('click',on_off);
        local_unit();
  
        render();
//	console.log(G);
	
  }
  
  function local_unit(){
      //change global_switcher
      $(G.tabs).find('.main_switcher .block .on-off').css({'background-image':'url(./templates/img/group/on-off-3.png)','width':'35px','background-size':'auto 67px'})
      
               //SturtUP stustus
        ep.push({'id':'1','title':'Зал','onoff':'off','icon':'group_lamp'});
        ep.push({'id':'2','title':'Гараж','onoff':'on','icon':'group_lamp'});
        ep.push({'id':'3','title':'Гараж2','onoff':'off','icon':'group_lamp'});
        ep.push({'id':'4','title':'Гараж3','onoff':'off','icon':'group_lamp'});
        ep.push({'id':'5','title':'Туалет','onoff':'off','icon':'group_lamp'});
        ep.push({'id':'6','title':'Котел','onoff':'off','icon':'boiler'});
         
       //  console.log(ep);
       elem=$(G.specialTab).find('.group');
             var html='';
          var line=Math.ceil(ep.length/4);
          console.log(line);
          var cl='';
         for(var x in ep){
            if(line==2 && x<4){cl='under';}else{cl=''}
                 html= html+'<div id="gw_'+ep[x].id+'" class="group_win '+cl+'"><p>'+ep[x].title+'</p><div class="ico">'+(ep[x].icon!=''?'<img src="./templates/img/group/'+ep[x].icon+'-'+ep[x].onoff+'.png">':'no icon')+'</div><div class="gswitch"><div class="on-off" data-on="'+ep[x].onoff+'"></div><div class="i"></div></div></div>';
            if(x!=3 && x!=6){html= html+'<div class="vert-border"></div>';}
         }
            if(line==2){
                  $(G.dialog).dialog({width: 599, height: 610}); 
                
            }else{
                     $(G.dialog).dialog({width: 599, height: 350});                
            }
           
         $(elem).html(html);
            $(elem).find('.group_win .on-off[data-on="on"]').css({'background-position':'0px -48px'});
            $(elem).find('.group_win .on-off[data-on="on"]').next('.i').css({'background-position':'-39px 0px'});
      
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
                $(G.specialTab).find('.main_switcher .on-off').css({'background-position':'0px -34px'});
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