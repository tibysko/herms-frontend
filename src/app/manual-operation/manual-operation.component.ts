import { Component, OnInit } from '@angular/core';

import { Pin } from '../model/pin.interface';
import { Valve, ValveStatus } from '../model/valve';
import { Motor } from '../model/motor';
import { PinValveService } from '../core/pin-valve.service';
import { PinService, PinValue } from '../core/pin.service';
import { PidController } from './pid-controller.interface';
import { PidControllerService } from './pid-controller.service';


@Component({
    selector: 'manual-operation',
    templateUrl: 'manual-operation.component.html'
})

export class ManualOperationComponent implements OnInit {
    motors: Motor[] = [];
    pins: Pin[] = [];
    pinsValves: any = [];
    valves: Valve[] = [];
    valvesObservable: any;
    pidControllerObservable: any;
    pidController: PidController = { 'temperature': "0", "pidOutput": "0" };

    constructor(private pinValveService: PinValveService,
        private pinService: PinService,
        private pidControllerService: PidControllerService) {

        this.motors.push(new Motor('HW_PUMP', 'HW_PUMP'));
        this.motors.push(new Motor('WORT_PUMP', 'WORT_PUMP'));
    }

    ngOnInit() {
        this.valvesObservable = this.pinValveService.getValvesAsArray().subscribe((data: Valve[]) => {
            this.valves = data.sort();
        });

        this.pidControllerObservable = this.pidControllerService.getPidControllerObservable().subscribe((pidController: PidController) => {
            this.pidController = pidController;
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

    startMotor(motor: Motor) {
        this.pinService.write(motor.getPin(), PinValue.HIGH);
    }

    stopMotor(motor: Motor) {
        this.pinService.write(motor.getPin(), PinValue.LOW);
    }

}