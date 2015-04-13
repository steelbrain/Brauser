

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

    this.WebView.addEventListener('page-title-set', function(Event){
      Title.textContent = Event.title || 'New Tab';
    });

    Main.TaskBar.Tabs.insertBefore(this.Tab, Main.TaskBar.Tabs.querySelector('paper-tab:last-child'));
    Main.Tabs.Root.appendChild(this.WebView);

    this.WebView.setAttribute('src', URL);
  }
}