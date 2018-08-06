var scrollAnimationClass = 'sa';
var scrollAnimationShowClass = 'show';
var triggerMarginDefault = 300;

var scrollAnimationElm = document.querySelectorAll('.' + scrollAnimationClass);
var scrollAnimationFunc = function() {
  var dataMargin = scrollAnimationClass + '_margin';
  var dataTrigger = scrollAnimationClass + '_trigger';
  var dataDelay = scrollAnimationClass + '_delay';
  for(var i = 0; i < scrollAnimationElm.length; i++) {
    var triggerMargin = triggerMarginDefault;
    var elm = scrollAnimationElm[i];
    var showPos = 0;
    if(elm.dataset[dataMargin] != null) {
      triggerMargin = parseInt(elm.dataset[dataMargin]);
    }
    if(elm.dataset[dataTrigger]) {
      showPos = document.querySelector(elm.dataset[dataTrigger]).getBoundingClientRect().top + triggerMargin;
    } else {
      showPos = elm.getBoundingClientRect().top + triggerMargin;
    }
    if (window.innerHeight > showPos) {
      var delay = (elm.dataset[dataDelay])? elm.dataset[dataDelay] : 0;
      setTimeout(function(index) {
        scrollAnimationElm[index].classList.add('show');
      }.bind(null, i), delay);
    }
  }
}
window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);