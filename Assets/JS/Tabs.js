

"use strict";
class Tabs{
  constructor(){
    this.Active = null;
    this.Tabs = [];
    this.Root = $("#Content");
  }
  CreateNew(Link, IsSelected){
    let TheTab = new Tab(Link);
    this.Tabs.push(TheTab);
    if(IsSelected){
      this.Select(TheTab);
    }
    return TheTab;
  }
  Select(Tab){
    if(this.Active){
      this.Active.WebView.classList.remove('show');
    }
    Main.TaskBar.Tabs.selected = this.Tabs.indexOf(Tab);
    this.Active = Tab;
    this.Active.WebView.classList.add('show');
  }
}