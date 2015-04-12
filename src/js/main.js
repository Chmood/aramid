/*globals window, document, console */

window.onload = function () {
  'use strict';

  var $togglers = document.querySelectorAll('[data-toggle]');


  Array.prototype.forEach.call($togglers, function(el){

    console.log();

    var $target = document.querySelectorAll(el.getAttribute('data-toggle'))[0];
    var classname = el.getAttribute('data-toggle-classname');

    el.addEventListener('click', function() {

      if ($target.classList.contains(classname)) {
        $target.classList.remove(classname);

      } else {
        $target.classList.add(classname);
      }
    });


  });
};
