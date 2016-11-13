import { Component, OnInit, OnDestroy } from '@angular/core';


import { SocketService } from '../core/socket.service';
import { Valve } from '../model/valve.interface';

@Component({
    selector: 'overview',
    templateUrl: 'overview.component.html'
})

export class OverviewComponent implements OnInit, OnDestroy {
    private connection: any;

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

    constructor(private socketService: SocketService) { }

    private getColor(valve: Valve) {
        if (valve) {
            if (valve.status === 'OPENED') {
                return OverviewComponent.COLOR_GREEN;
            } else if (valve.status === 'CLOSED') {
                return OverviewComponent.COLOR_RED;
            } else {
                return OverviewComponent.COLOR_BLACK;
            }
        }
    }

    ngOnInit() {

        this.connection = this.socketService.getValves().subscribe((valves: Valve[]) => {
            for (let valve of valves) {
                this[valve.name] = OverviewComponent.COLOR_GREEN;// this.getColor(valve);

            }
        });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}
