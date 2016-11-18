import { Component, ViewContainerRef, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { SocketService } from './core/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private viewContainerRef: ViewContainerRef;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

  public constructor(viewContainerRef: ViewContainerRef,
    private socketService: SocketService,
    private notificationsService: NotificationsService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.socketService.getError().subscribe((error: string) => {
      this.notificationsService.error('Server error', error, { timeOut: 0 })
    });
  }
}
