$(function(){
  $('#media-center .control-r-media-center-button').click(function(){
    alert(getAction(this))
  })
})

function getAction(el){
  var classes = $(el).attr('class').split(/\s+/)
  for(var i in classes){
	var s = classes[i]  
    if(/-button$/.test(s)) continue
    return s.match(/[a-z0-9]+$/)[0]		
  }
}
