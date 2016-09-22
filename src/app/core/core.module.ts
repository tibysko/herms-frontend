
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinNotificationService } from './pin-notification.service';
import { PinValveService } from './pin-valve.service';

@NgModule({
    imports: [CommonModule],
    providers: [PinNotificationService, PinValveService]
})
export class CoreModule { }