//see bling.js
window.$ = document.querySelectorAll.bind(document)
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn)
}
NodeList.prototype.__proto__ = Array.prototype
NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn)
  })
}


const cmp = {none:0, west:1, east:2,north:4,south:8} //directions cmp as in 
const gs = {start:0, starting:1, pause:2, play:3, win:4}//game state
const cell = 40;

class Util
{
  static rand(a, b) {
	    return ~~(Math.random() * (b - a) + a);
  };
}