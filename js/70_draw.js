define(function(){
var ctx;
 //alert('draw is load');
    
    function init(){
         alert('draw init');        
    }

  function meteoG(c,userData,colors){
     var   canvas=c;
      console.log(canvas);
        if (canvas.getContext) {

            ctx = canvas.getContext('2d');

            var maxCount = 33 + 10;
            var x0 =  10;
            var y0 = 5;
            var width = canvas.width;
            var height = canvas.height;

console.log('Size:'+width+'--'+height);

            var stepY = Math.round((height-y0 )/ 6);
            var stepY2 = Math.round((stepY)/ 10);           
            var stepX = Math.round((width -x0) / 13);
console.log(stepY+'--'+stepX);
            var Xn=x0;
            var Yn=y0;

            ctx.beginPath();
            
            var m = 0;
            Xn=30;
            Yn+= stepY;
            ctx.strokeStyle = "#FFFFFF";
            ctx.fillStyle  = "#2b2721";
            var Yt={1:20,2:10,3:0,4:-10,5:-20};
            var Xt={1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12};
            var i;
            for (i = Yn; m < 5; i += stepY) {
             //   console.log(x0+'--'+i);
                m ++;
            ctx.moveTo(Xn, i);
            ctx.lineTo(width-x0, i);
            ctx.fillText(Yt[m], x0, i+10);
            }
            
            i-=10;            
            for (var x in Xt) {
                ctx.fillText(Xt[x], Xn, i);                
                Xn+=stepX;
            }
            
            ctx.stroke();
            ctx.beginPath(); 
          var tx=20;
          var ty=y0+18;
            
          var sx=x0+tx ;var sy=height-ty;  
          var YZ=y0+3*stepY;
          sy=YZ-userData[0]*stepY2;
          ctx.moveTo(sx, sy);
//           ctx.lineTo(width-x0, 0+y0);
          ctx.strokeStyle = "#FF0000";
              ctx.lineWidth = 2;
               for (var x in userData) {
                   sy=YZ-userData[x]*stepY2;
           ctx.lineTo(sx, sy);
              console.log(sx+'--'+sy);
                   sx+=stepX;  
                   
        }
            ctx.stroke();

        }else{
            console.log('no canvas');
        }
    }
    
    function drawLine(x_first, y_first, x_second, y_second)
    {
       ctx.beginPath();  
        ctx.moveTo( x_first, y_first );
        ctx.lineTo( x_second, y_second );
        ctx.lineWidth = 2;
        ctx.stroke();
    }


    return {
        init:init,
        meteoG:meteoG
    }
})