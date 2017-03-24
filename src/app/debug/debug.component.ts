import { SocketService } from '../core/socket.service';
import { OnDestroy, Component, OnInit } from '@angular/core';

import { Pin } from '../model/pin.interface';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'debug',
  templateUrl: './debug.component.html'
})
export class DebugComponent implements OnInit, OnDestroy {
  private pinSubscription: Subscription;
  pins: Pin[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.pinSubscription = this.socketService.getPins().subscribe((pins: Pin[]) => {
      this.pins = pins;
    });
  }

  ngOnDestroy() {
    this.pinSubscription.unsubscribe();
  }

}
