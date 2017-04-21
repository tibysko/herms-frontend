import { Component, OnInit, OnDestroy } from '@angular/core';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';
import { System } from "app/core/system.interface";
import { SocketService } from '../core/socket.service';
import { Valve, ValveState } from '../model/valve.interface';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'overview',
    templateUrl: 'overview.component.html'
})

export class OverviewComponent implements OnInit, OnDestroy {
    private valveSubscription: Subscription;

    AUTO_SPARAGE: String;
    HE_CW_IN: String;
    HE_CW_OUT: String;
    HE_HW_IN: String;
    HE_HW_OUT: String;
    KET_RECIRC: String;
    KET_WORT_IN: String;
    KET_WORT_OUT: String;
    MLT_HW_IN: String;
    MLT_KET_BYPASS: String;
    MLT_WORT_IN: String;
    MLT_WORT_OUT: String;

    static COLOR_BLACK: String = `rgba(0, 0, 0,1)`;
    static COLOR_GREEN: String = `rgba(0, 255, 0,1)`;
    static COLOR_RED: String = `rgba(255, 0, 0,1)`;

    system: System = {
        data: {
            waterLevelHlt: 0,
            tempHeOut: 0
        }
    };

    pidControllerData: PidControllerData = {
        name: '',
        output: '',
        temperature: ''
    };

    tempHLT: any;
    tempMltOut: any;

    constructor(private socketService: SocketService) {
        this.setupSystemData();
        this.setupPidData();
    }

    private setupSystemData() {
        this.socketService.getSystem().subscribe((data: System) => {
            this.system = data;
        });
    }

    private setupPidData() {
        this.socketService.getControllersData().subscribe((data: PidControllerData[]) => {
            this.tempHLT = data[0].temperature;
            this.tempMltOut = data[1].temperature;
        });
    }

    private getColor(valve: Valve) {
        if (valve) {
            let state = ValveState[valve.state];

            if (state === ValveState.OPENED) {
                return OverviewComponent.COLOR_GREEN;
            } else if (state === ValveState.CLOSED) {
                return OverviewComponent.COLOR_RED;
            } else {
                return OverviewComponent.COLOR_BLACK;
            }
        }
    }

    ngOnInit() {
        this.valveSubscription = this.socketService.getValves().subscribe((valves: Valve[]) => {
            for (let valve of valves) {
                this[valve.name] = this.getColor(valve);
            }
        });
    }

    ngOnDestroy() {
        this.valveSubscription.unsubscribe();
    }
}
