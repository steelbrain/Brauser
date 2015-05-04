

"use strict";
var NavStatus = {
  START: 'START',
  STOP: 'STOP',
  REDIRECT: 'REDIRECT',
  FAIL: 'FAIL'
};
class Tab extends EventEmitter{
  constructor(URL){
    super();
    let Emit = this.emit.bind(this);
    let Title = document.createElement('span');
    let Icon = document.createElement('span');

    this.Tab = document.createElement('paper-tab');
    this.WebView = document.createElement('webview');

    Title.textContent = 'New Tab';

    this.Tab.appendChild(Icon);
    this.Tab.appendChild(Title);

    Main.TaskBar.Tabs.insertBefore(this.Tab, Main.TaskBar.Tabs.querySelector('paper-tab:last-child'));
    Main.Tabs.Root.appendChild(this.WebView);

    this.WebView.setAttribute('src', URL);

    this.WebView.addEventListener('page-title-set', function(Event){
      Emit('Title:Update', Event.title);
    });
    this.WebView.addEventListener('did-start-loading', function(){
      Emit('Navigation:Status', NavStatus.START)
    });
    this.WebView.addEventListener('did-stop-loading', function(){
      Emit('Navigation:Status', NavStatus.STOP);
    });
    this.WebView.addEventListener('did-finish-loading', function(){
      Emit('Navigation:Status', NavStatus.STOP);
    });
    this.WebView.addEventListener('did-fail-load', function(Event){
      Emit('Navigation:Status', NavStatus.FAIL, {code: Event.errorCode, description: Event.errorDescription});
    });
    this.WebView.addEventListener('page-favicon-updated', function(Event){
      Emit('Favicon:Update', Event.favicons[0]);
    });
  }
}