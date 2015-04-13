(function(){
  "use strict";
  let v8 = require('v8');
  v8.setFlagsFromString('--harmony_classes');
  v8.setFlagsFromString('--harmony_object_literals');
  v8.setFlagsFromString('--harmony_tostring');
  v8 = null;
  document.addEventListener('DOMContentLoaded', function(){
    window.Main = new Renderer;
  });
})();