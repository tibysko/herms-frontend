import { Component, OnInit, OnDestroy } from '@angular/core';

//import {PinNotificationService} from '../core/pin-notification.service';
import { PinValveService } from '../core/pin-valve.service';
import { Pin } from '../model/pin.interface';
import { Valve, ValveStatus } from '../model/valve';

@Component({
    selector: 'overview',
    templateUrl: 'overview.component.html'
})

export class OverviewComponent implements OnInit, OnDestroy {
    private connection: any;

    autoSparage: String;
    heCwIn: String;
    heCwOut: String;
    heHwIn: String;
    heHwOut: String;
    ketRecirc: String;
    ketWortIn: String;
    ketWortOut: String;
    mltHwIn: String;
    mltKetByPass: String;
    mltWortIn: String;
    mltWortOut: String;

    static COLOR_BLACK: String = `rgba(0, 0, 0,1)`;
    static COLOR_GREEN: String = `rgba(0, 255, 0,1)`;
    static COLOR_RED: String = `rgba(255, 0, 0,1)`;

    constructor(public pinValveService: PinValveService) {}
    
    private getColor(valve: Valve) {
        if (valve) {
            if (valve.getStatus() === ValveStatus.OPENED) {
                return OverviewComponent.COLOR_GREEN;
            } else if (valve.getStatus() === ValveStatus.CLOSED) {
                return OverviewComponent.COLOR_RED;
            } else {
                return OverviewComponent.COLOR_BLACK;
            }
        }
    }

    ngOnInit() {
        this.connection = this.pinValveService.getValves().subscribe((valves: Map<String, Valve>) => {
            // this.autoSparage: String = this.getColor(valves.get('AUTO_SPARAGE');         
            this.heCwIn = this.getColor(valves.get('HE_CW_IN'));
            this.heCwOut = this.getColor(valves.get('HE_CW_OUT'));
            this.heHwIn = this.getColor(valves.get('HE_HW_IN'));
            this.heHwOut = this.getColor(valves.get('HE_HW_OUT'));
            this.ketRecirc = this.getColor(valves.get('KET_RECIRC'));
            this.ketWortIn = this.getColor(valves.get('KET_WORT_IN'));
            this.ketWortOut = this.getColor(valves.get('KET_WORT_OUT'));
            this.mltHwIn = this.getColor(valves.get('MLT_HW_IN'));
            //this.mltKetByPass = this.getColor(valves.get('MLT_KET_BY_PASS'));
            this.mltWortIn = this.getColor(valves.get('MLT_WORT_IN'));
            this.mltWortOut = this.getColor(valves.get('MLT_WORT_OUT'));
        });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
