

"use strict";
var NavStatus = {
  START: 'START',
  RECEIVING: 'RECEIVING',
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
    let WebView = document.createElement('webview');

    let Expecting = false;
    let LastStatus = null;
    let LastFavicon = null;
    let LastURL = null;

    this.Tab = document.createElement('paper-tab');
    this.WebView = WebView;

    Title.textContent = 'New Tab';

    this.Tab.appendChild(Icon);
    this.Tab.appendChild(Title);

    Main.TaskBar.Tabs.insertBefore(this.Tab, Main.TaskBar.Tabs.querySelector('paper-tab:last-child'));
    Main.Tabs.Root.appendChild(this.WebView);

    // Subscribing on own events
    this.on('Navigation:Status', function(Status){
      LastStatus = Status;
      if(Status === NavStatus.START || Status === NavStatus.REDIRECT){
        Icon.innerHTML = '<paper-spinner class="blue backward" active></paper-spinner>';
      } else if(Status === NavStatus.RECEIVING){
        Icon.innerHTML = '<paper-spinner class="blue" active></paper-spinner>';
      } else if(Status === NavStatus.STOP || Status === NavStatus.FAIL){
        if(WebView.getUrl() === LastURL && LastFavicon.length){
          this.emit('Favicon:Render');
        } else {
          Icon.innerHTML = '';
        }
      }
    });
    this.on('Favicon:Render', function(){
      Icon.innerHTML = `<img src="${LastFavicon}" />`;
    });
    this.on('Favicon:Update', function(URL){
      LastURL = WebView.getUrl();
      LastFavicon = URL;
      if(LastStatus === NavStatus.STOP){
        this.emit('Favicon:Render');
      }
    });
    this.on('Title:Update', function(TitleValue){
      if(WebView.getUrl() === 'about:blank'){
        Title.textContent = 'New Tab';
      } else {
        Title.textContent = TitleValue;
      }
    });

    // WebView Events
    this.emit('Navigation:Status', NavStatus.START);
    this.WebView.setAttribute('src', URL);
    this.WebView.addEventListener('page-title-set', function(Event){
      Emit('Title:Update', Event.title);
    });
    this.WebView.addEventListener('did-start-loading', function(){
      Expecting = true;
      Emit('Navigation:Status', NavStatus.START);
    });
    this.WebView.addEventListener('did-stop-loading', function(){
      Expecting = false;
      Emit('Navigation:Status', NavStatus.STOP);
    });
    this.WebView.addEventListener('did-fail-load', function(Event){
      Emit('Navigation:Status', NavStatus.FAIL, {code: Event.errorCode, description: Event.errorDescription});
    });
    this.WebView.addEventListener('page-favicon-updated', function(Event){
      Emit('Favicon:Update', Event.favicons[0]);
    });
    this.WebView.addEventListener('did-get-response-details', function(){
      if(!Expecting) return ;
      Expecting = false;
      if(LastStatus !== NavStatus.STOP){
        Emit('Navigation:Status', NavStatus.RECEIVING);
      }
    });
  }
}