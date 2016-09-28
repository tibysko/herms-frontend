
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinService } from '../core/pin.service';
import { PinNotificationService } from './pin-notification.service';
import { PinValveService } from './pin-valve.service';

@NgModule({
    imports: [CommonModule],
    providers: [PinService, PinNotificationService, PinValveService]
})
export class CoreModule { }