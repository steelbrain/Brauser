

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
    Title.classList.add('tab-title');
    Icon.classList.add('tab-icon');

    this.Tab.appendChild(Icon);
    this.Tab.appendChild(Title);

    Main.TaskBar.Tabs.insertBefore(this.Tab, Main.TaskBar.Tabs.querySelector('paper-tab:last-child'));
    Main.Tabs.Root.appendChild(this.WebView);

    // Subscribing on own events
    this.on('Navigation:Status', function(Status){
      this.Status = LastStatus = Status;
      if(Status === NavStatus.START || Status === NavStatus.REDIRECT){
        Icon.innerHTML = '<paper-spinner class="request backward" active></paper-spinner>';
      } else if(Status === NavStatus.RECEIVING){
        Icon.innerHTML = '<paper-spinner class="yellow" active></paper-spinner>';
      } else if(Status === NavStatus.STOP || Status === NavStatus.FAIL){
        if(WebView.getUrl() === LastURL && LastFavicon.length){
          this.emit('Favicon:Render');
        } else {
          Icon.innerHTML = '';
        }
      }
    });
    this.on('Favicon:Render', function(){
      Icon.innerHTML = `<img class="tab-img" src="${LastFavicon}" />`;
    });
    this.on('Favicon:Update', function(URL){
      LastURL = WebView.getUrl();
      LastFavicon = URL;
      this.Favicon = URL;
      if(LastStatus === NavStatus.STOP){
        this.emit('Favicon:Render');
      }
    });
    this.on('Title:Update', function(TitleVal){
      Title.textContent = TitleVal;
    });

    // WebView Events
    this.emit('Navigation:Status', NavStatus.START);
    this.WebView.setAttribute('src', URL);
    this.WebView.addEventListener('page-title-set', function(Event){
      Emit('Title:Update', this.getUrl() === 'about:blank' ? 'New Tab' : Event.title);
    });
    this.WebView.addEventListener('did-start-loading', function(){
      Expecting = true;
      Emit('URL:Update', this.getUrl());
      Emit('Navigation:Status', NavStatus.START);
    });
    this.WebView.addEventListener('did-get-redirect-request', function(e){
      if(e.isMainFrame){
        Emit('URL:Update', e.newUrl);
      }
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
    this.WebView.addEventListener('did-get-response-details', function(e){
      if(!Expecting) return ;
      Expecting = false;
      if(LastStatus !== NavStatus.STOP){
        Emit('URL:Update', e.newUrl);
        Emit('Navigation:Status', NavStatus.RECEIVING);
      }
    });

    // Listen on extra high-level events
    this.Listen();
  }
  Listen(){
    let OldURL = null;
    this.on('URL:Update', function(URL){
      if(this !== Main.Tabs.Active) return void(OldURL = URL);
      if(Main.URLBar.URL.matches(':focus')){
        if(OldURL === Main.URLBar.URL){
          Main.URLBar.URL.value = URL;
        }
      } else {
        Main.URLBar.URL.value = URL;
        OldURL = URL;
      }
    });
    this.on('Navigation:Status', function(Status){
      if(this !== Main.Tabs.Active) return ;
      Main.URLBar.Back.disabled = !this.WebView.canGoBack();
      Main.URLBar.Forward.disabled = !this.WebView.canGoForward();
      if(Status === NavStatus.STOP){
        Main.URLBar.RefreshStop.icon = 'refresh';
      } else {
        Main.URLBar.RefreshStop.icon = 'close';
      }
    });
  }
}