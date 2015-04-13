

"use strict";
class Renderer{
  constructor(){
    document.addEventListener('keydown', this.DocumentKey.bind(this));
    this.Tabs = $("#Header-Left-Tabs");
  }
  DocumentKey(e){
    if(e.ctrlKey){
      if(e.altKey && e.which === 82){
        location.reload();
      }
    }
  }
}