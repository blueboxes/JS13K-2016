 
const context = document.getElementById("canvas").getContext("2d");
const g = new Game(context,
  (e)=>{
      if(e==gs.play){
        $("footer")[0].classList.remove("hdn");
        $("#starting")[0].classList.add("hdn");
        $("#mz")[0].classList.remove("hdn");
        resizeCanvas()
      }
      if(e==gs.pause){$("#pause")[0].classList.remove("hdn")}
      if(e==gs.win){
        $("#end")[0].classList.remove("hdn");
        $("#tw")[0].href = "https://twitter.com/intent/tweet?text=I%20have%20just%20escaped%20maze%2013%20in%20" + encodeURIComponent($("#tm")[0].innerText) + "%20at%20" + encodeURIComponent(this.window.location.href) + "&hashtags=js13k,maze13&via=johnkilmister";
      }
    },
  (s,m,ms)=>
      {
          $("#sec")[0].innerText = s;
          $("#min")[0].innerText  = m; 
          $("#ms")[0].innerText  = ms; 
          $("#tm")[0].innerText = `${m}m ${s}s ${ms}ms`; 
      });
 
$(".go").on("click", ()=>{
  $("#starting")[0].classList.remove("hdn");
  $("#start")[0].classList.add("hdn"); 
  $("#end")[0].classList.add("hdn");
  var e = $("#starting p")[0];
  e.classList.add("cd");
  e.innerText = 3;
  e.on("animationstart", e => {e.target.innerHTML=3});
  e.on("animationiteration", e => {e.target.innerHTML=3-Math.abs(e.elapsedTime)});
  e.on("animationend", e => {g.start()});
});
$("#mte")[0].on("click", ()=>{g.mute()});
$(".tri").on("mousedown", (e)=>{e.preventDefault();g.keys[parseInt(e.target.dataset.key)]=true});
$(".tri").on("mouseup", (e)=>{e.preventDefault();g.keys[parseInt(e.target.dataset.key)]=false});
 $("#canvas").on("click", (e)=>{g.aim(e.clientX,e.clientY)});
document.onkeydown = (e) =>{g.keys[e.keyCode]=true;}
document.onkeyup = (e) =>{g.keys[e.keyCode]=null;}

(function () {
  function main(tFrame) {
    g.stopMain = window.requestAnimationFrame(main);
    
    g.update(tFrame);  
    g.render();
  }
  
  main(); 
})();

function resizeCanvas(){
    let c = $("#canvas")[0];
    let m = $("main")[0];
    c.width  = m.offsetWidth-30;
    c.height  = m.offsetHeight-30;   
}