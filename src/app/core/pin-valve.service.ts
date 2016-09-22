import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Pin } from '../model/pin.interface';
import { PinNotificationService } from './pin-notification.service';
import { Valve, ValveStatus } from '../model/valve';

@Injectable()
export class PinValveService {
    private connection: any;
    private valves: Map<String, Valve> = new Map<String, Valve>();
    private valvesSubject: Subject<Map<String, Valve>> = new Subject<Map<String, Valve>>();

    // TODO add to valveNames  
    //  this.valves.push(new Valve('AUTO_SPARAGE'));
    //this.valves.push(new Valve('MLT_KET_BY_PASS')); 

    constructor(private pinNotificationService: PinNotificationService) {
       // this.valves.set('AUTO_SPARAGE', new Valve());
        this.valves.set('HE_CW_IN', new Valve());
        this.valves.set('HE_CW_OUT', new Valve());
        this.valves.set('HE_HW_IN', new Valve());
        this.valves.set('HE_HW_OUT', new Valve());
        this.valves.set('KET_RECIRC', new Valve());
        this.valves.set('KET_WORT_IN', new Valve());
        this.valves.set('KET_WORT_OUT', new Valve());
        this.valves.set('MLT_HW_IN', new Valve());
        //this.valves.set('MLT_KET_BY_PASS', new Valve());
        this.valves.set('MLT_WORT_IN', new Valve());
        this.valves.set('KET_WORT_OUT', new Valve());

        this.connection = this.pinNotificationService.getPinsObservable().subscribe(pins => {
            this.updateValves(pins);
            this.valvesSubject.next(this.valves);
        });

    }

    private updateValves(pins) {
        this.valves.forEach((valve: Valve, key: String, map: Map<String, Valve>) => {
            let closedPinValue = pins[key + '_CLOSED'].value;
            let openedPinValue = pins[key + '_OPENED'].value;

            if (openedPinValue > 0) {
                valve.setStatus(ValveStatus.OPENED);
            } else if (closedPinValue > 0) {
                valve.setStatus(ValveStatus.CLOSED);
            } else {
                valve.setStatus(ValveStatus.ADJUSTING);
            }
        });
    }

    getValves() {
        return this.valvesSubject.asObservable();
    }
}