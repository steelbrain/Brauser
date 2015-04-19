

"use strict";
class Tab{
  constructor(URL){
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
      Title.textContent = Event.title || 'New Tab';
    });

    this.WebView.addEventListener('did-start-loading', this.OnURLUpdate.bind(this));
    this.WebView.addEventListener('did-stop-loading', this.OnURLUpdate.bind(this));
    this.WebView.addEventListener('did-get-redirect-request', function(Event){
      if(Event.isMainFrame)
        this.OnURLUpdate();
    }.bind(this));
  }
  OnURLUpdate(){
    if(Main.Tabs.Active !== this){
      return ;
    }
    Main.URLBar.URL.value = this.WebView.getUrl();
  }
}