

"use strict";
class TaskBar{
  constructor(){
    // For some reasons adding docs to stuff make them look a bit less ugly
    let Root = $("div[data-role=TaskButtons]");
    Root.querySelector("paper-icon-button[icon=remove]").addEventListener('click', function(){
      Main.BrowserWindow.minimize();
    });
    Root.querySelector("paper-icon-button[icon=close]").addEventListener('click', function(){
      Main.BrowserWindow.close();
    });
    Root.querySelector("paper-icon-button[icon=tab]").addEventListener('click', function(){
      if(Main.BrowserWindow.isMaximized()){
        Main.BrowserWindow.unmaximize();
      } else {
        Main.BrowserWindow.maximize();
      }
    });
  }
}