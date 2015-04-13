

"use strict";

var
  App = require('app'),
  BrowserWindow = require('browser-window'),
  Path = require('path'),
  FS = require('fs');

require('crash-reporter').start();

class Main{
  constructor(){
    App.on('window-all-closed', this.WindowsClosed.bind(this));
    App.on('ready', this.Ready.bind(this));

    App.setName("Browser");
    App.setPath('userData', Path.join(App.getPath('appData'), App.getName()));
    App.setPath('userCache', Path.join(App.getPath('cache'), App.getName()));
    App.commandLine.appendSwitch('js-flags', '--harmony_classes');
    App.commandLine.appendSwitch('js-flags', '--harmony_object_literals');
    App.commandLine.appendSwitch('js-flags', '--harmony_tostring');

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
    if(process.argv.indexOf('--dev')){
      this.BrowserWindow.toggleDevTools();
    }
    this.BrowserWindow.maximize();
  }
  WindowsClosed(){
    App.quit();
  }
}

App.BrowserMain = module.exports = new Main();