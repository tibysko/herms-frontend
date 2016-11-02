
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinService } from '../core/pin.service';
import { SocketService } from './socket.service';
import { PinValveService } from './pin-valve.service';

@NgModule({
    imports: [CommonModule],
    providers: [PinService, SocketService, PinValveService]
})
export class CoreModule { }