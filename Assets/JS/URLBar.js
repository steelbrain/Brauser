"use strict";
class URLBar{
  constructor(){
    this.Root = document.getElementById('Header-URLBar');
    this.Back = this.Root.children[0];
    this.Forward = this.Root.children[1];
    this.RefreshStop = this.Root.children[2];
    this.URL = this.Root.children[3];
    this.Options = this.Root.children[4];

    this.URL.addEventListener('keydown', function(e){
      if(e.which !== 13) return ;
      Main.Tabs.Active.WebView.src = this.value;
    });
    this.Back.addEventListener('click', function(){
      Main.Tabs.Active.WebView.goBack();
    });
    this.Forward.addEventListener('click', function(){
      Main.Tabs.Active.WebView.goForward();
    });
    this.RefreshStop.addEventListener('click', function(){
      if(this.icon === 'refresh'){
        Main.Tabs.Active.WebView.reload();
      } else {
        Main.Tabs.Active.WebView.stop();
      }
    });
  }
}