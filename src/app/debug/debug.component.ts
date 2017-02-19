import { SocketService } from '../core/socket.service';
import { OnDestroy, Component, OnInit } from '@angular/core';

import { Pin } from '../model/pin.interface';

@Component({
  selector: 'debug',
  templateUrl: './debug.component.html'
})
export class DebugComponent implements OnInit, OnDestroy {
  private connection: any;
  pins: Pin[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getPins().subscribe((pins: Pin[]) => {
      this.pins = pins;
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
