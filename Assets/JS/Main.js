

"use strict";
class Renderer{
  constructor(){
    window.Main = this;
    this.Remote = require('remote');
    this.BrowserWindow = this.Remote.getCurrentWindow();

    this.TaskBar = new TaskBar();
    this.Tabs = new Tabs();
    this.URLBar = new URLBar();

    this.Listen();
    this.Tabs.CreateNew('https://www.google.co.uk', true);

  }
  Listen(){
    document.addEventListener('keydown', function(e){
      if(e.which === 82 && e.ctrlKey && e.altKey){ // CTRL + ALT + R
        location.reload();
      } else if((e.which === 73 && e.ctrlKey && e.shiftKey) || e.which === 123){ // F12 OR CTRL + SHIFT + I
        if(Main.Tabs.Active){
          if(Main.Tabs.Active.WebView.isDevToolsOpened()){
            Main.Tabs.Active.WebView.closeDevTools();
          } else {
            Main.Tabs.Active.WebView.openDevTools();
          }
        }
      }
    });
  }
}