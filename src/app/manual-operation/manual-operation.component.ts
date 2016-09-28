import { Component, OnInit } from '@angular/core';

import { Pin } from '../model/pin.interface';
import { Valve, ValveStatus } from '../model/valve';
import { PinValveService } from '../core/pin-valve.service';
import { PinService } from '../core/pin.service';

@Component({
    selector: 'manual-operation',
    templateUrl: 'manual-operation.component.html'
})

export class ManualOperationComponent implements OnInit {
    pins: Pin[] = [];
    pinsValves: any = [];
    showExtraPinInfo: boolean = false;
    valves: Valve[] = [];
    valvesObservable: any;

    constructor(private pinValveService: PinValveService,
        private pinService: PinService) { }

    ngOnInit() {
        this.valvesObservable = this.pinValveService.getValvesAsArray().subscribe((data: Valve[]) => {
            this.valves = data.sort();
        });
    }

    getRowClass(valve: Valve) {
        if (valve.getStatus() === ValveStatus.CLOSED)
            return "danger";
        else if (valve.getStatus() === ValveStatus.OPENED)
            return "success";
        else
            return "";
    }

    startClosingValve(valve) {
        this.pinValveService.startClosingValve(valve);
    }

    stopClosingValve(valve) {
        this.pinValveService.stopClosingValve(valve);
    }

    startOpeningValve(valve) {
        this.pinValveService.startOpenValve(valve);
    }

    stopOpeningValve(valve) {
        this.pinValveService.stopOpenValve(valve);
    }

    operationOn(pin: Pin) {
        // this.pinService.write(pin, true);
    }

    operationOff(pin: Pin) {
        //this.pinService.write(pin, false);
    }

    operationRead(selectedPin: Pin) {
        //let pinRow = this.pins.filter(pin => pin.id === selectedPin.id) as Pin[];

        //this.pinService.read(selectedPin).then(result => {
        //  if(pinRow.length > 0) pinRow[0].value = result.value;
        //});
    }

    togglePinInfo() {
        console.log('toogle');
        this.showExtraPinInfo = !this.showExtraPinInfo;
    }
}