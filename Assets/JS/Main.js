

"use strict";
class Renderer{
  constructor(){
    window.Main = this;
    this.Remote = require('remote');
    this.BrowserWindow = this.Remote.getCurrentWindow();

    this.TaskBar = new TaskBar();
    this.URLBar = new URLBar();
    this.Tabs = new Tabs();

    this.Initialize();
    this.URLBar.Initialize();
  }
  Initialize(){
    document.addEventListener('keydown', function(e){
      if(e.ctrlKey){
        if(e.altKey && e.which === 82){
          location.reload();
        }
      }
    });
    this.Tabs.CreateNew('https://www.google.com.au', true);
  }
}