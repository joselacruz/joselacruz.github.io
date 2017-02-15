var smoothScroll = require('smooth-scroll')
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  smoothScroll.init({
    easing: 'easeInOutCubic',
    speed: 600
  })
})
