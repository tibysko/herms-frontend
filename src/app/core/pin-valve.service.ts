import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { Pin } from '../model/pin.interface';
import { PinService, PinValue } from '../core/pin.service';
import { PinNotificationService } from './pin-notification.service';
import { Valve, ValveStatus } from '../model/valve';

@Injectable()
export class PinValveService {
    private connection: any;
    private valves: Map<string, Valve> = new Map<string, Valve>();
    private valvesSubject: Subject<Map<string, Valve>> = new Subject<Map<string, Valve>>();
    private OPENED: string = '_OPENED';
    private CLOSED: string = '_CLOSED';
    private OPEN: string = '_OPEN';
    private CLOSE: string = '_CLOSE';

    constructor(private pinNotificationService: PinNotificationService,
        private pinService: PinService) {
    //  this.valves.push(new Valve('AUTO_SPARAGE'))
        this.valves.set('HE_CW_IN', new Valve());
        this.valves.set('HE_CW_OUT', new Valve());
        this.valves.set('HE_HW_IN', new Valve());
        this.valves.set('HE_HW_OUT', new Valve());
        this.valves.set('KET_RECIRC', new Valve());
        this.valves.set('KET_WORT_IN', new Valve());
        this.valves.set('KET_WORT_OUT', new Valve());
        this.valves.set('MLT_HW_IN', new Valve());
        this.valves.set('MLT_KET_BYPASS', new Valve());
        this.valves.set('MLT_WORT_IN', new Valve());
        this.valves.set('MLT_WORT_OUT', new Valve());
        this.valves.set('KET_WORT_OUT', new Valve());

        this.connection = this.pinNotificationService.getPinsObservable().subscribe(pins => {
            this.updateValves(pins);
            this.valvesSubject.next(this.valves);
        });

    }

    private updateValves(pins) {
        this.valves.forEach((valve: Valve, key: string, map: Map<string, Valve>) => {
            let closedPinValue = pins[key + this.CLOSED].value;
            let openedPinValue = pins[key + this.OPENED].value;

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

    getValvesAsArray() {
        return this.valvesSubject.asObservable()
            .map((valves: Map<string, Valve>, index: number) => {
                let valveArray: Valve[] = [];
                valves.forEach((valve: Valve, key: string, map: Map<string, Valve>) => {
                    valve.setName(key); // needed in list            
                    valveArray.push(valve);
                });

                return valveArray;
            });
    }

    startOpenValve(valve: Valve) {
        this.pinService.write(valve.getName() + this.OPEN, PinValue.HIGH);
    }

    stopOpenValve(valve: Valve) {
        this.pinService.write(valve.getName() + this.OPEN, PinValue.LOW);
    }

    startClosingValve(valve: Valve) {
        this.pinService.write(valve.getName() + this.CLOSE, PinValue.HIGH);
    }

    stopClosingValve(valve: Valve) {
        this.pinService.write(valve.getName() + this.CLOSE, PinValue.LOW);
    }
}