import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true    
}

  public constructor(viewContainerRef: ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}
