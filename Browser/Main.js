

"use strict";

var
  App = require('app'),
  BrowserWindow = require('browser-window'),
  Path = require('path'),
  FS = require('fs');

class Main{
  constructor(){
    process.name = 'Brauser';
    App.on('window-all-closed', this.WindowsClosed.bind(this));
    App.on('ready', this.Ready.bind(this));

    App.setName("Brauser");
    App.setPath('userData', Path.join(App.getPath('appData'), App.getName()));
    App.setPath('userCache', Path.join(App.getPath('cache'), App.getName()));

    this.BrowserWindow = null;
  }
  Ready(){
    this.BrowserWindow = new BrowserWindow({
      width: 800,
      height: 600,
      icon: FS.realpathSync(__dirname + '/../Assets/Images/icon32.png'),
      frame: false,
      center: true
    });
    this.BrowserWindow.loadUrl('file://' + __dirname + '/../Renderer/Index.html');
    if(process.argv.indexOf('--dev') !== -1){
      this.BrowserWindow.toggleDevTools();
    }
    this.BrowserWindow.maximize();
  }
  WindowsClosed(){
    App.quit();
  }
}

App.BrowserMain = module.exports = new Main();