

"use strict";
class Tab{
  constructor(URL){
    this.Tab = document.createElement('paper-tab');
    this.WebView = document.createElement('webview');

    this.Tab.textContent = 'New Tab';

    this.WebView.addEventListener('page-title-set', function(Event){
      this.Tab.textContent = Event.title || 'New Tab';
    }.bind(this));

    Main.TaskBar.Tabs.insertBefore(this.Tab, Main.TaskBar.Tabs.querySelector('paper-tab:last-child'));
    Main.Tabs.Root.appendChild(this.WebView);

    this.WebView.setAttribute('src', URL);
  }
}