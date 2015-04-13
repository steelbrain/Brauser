

"use strict";
class URLBar{
  constructor(){
    this.Root = $("div[data-role=URLBar]");
    this.Back = this.Root.querySelector("paper-icon-button[icon=arrow-back]");
    this.Forward = this.Root.querySelector("paper-icon-button[icon=arrow-forward]");
    this.Refresh = this.Root.querySelector("paper-icon-button[icon=refresh]");
    this.Options = this.Root.querySelector("paper-icon-button[icon=apps]");
    this.URL = this.Root.querySelector("input");
  }
  Initialize(){

  }
}