import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';

import { Pin } from '../model/pin.interface';
import { Valve } from '../model/valve.interface';
import { Motor } from '../model/motor';
import { PinService, PinValue } from '../core/pin.service';
import { PidController } from './pid-controller.interface';
import { PidControllerConfig } from './pid-controller-config.interface';
import { PidControllerData } from './pid-controller-data.interface';
import { PidControllerService } from './pid-controller.service';
import { ValveService, State } from './valve.service';
import { SocketService } from '../core/socket.service';

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
    pidControllers: PidController[] = [];

    constructor(private pinService: PinService,
        private socketService: SocketService,
        private pidControllerService: PidControllerService,
        private valveService: ValveService) {

        this.motors.push(new Motor('HW_PUMP', 'HW_PUMP'));
        this.motors.push(new Motor('WORT_PUMP', 'WORT_PUMP'));
    }

    ngOnInit() {
        this.valvesObservable = this.socketService.getValves().subscribe((data: Valve[]) => {
            this.valves = data.sort();
        });

        this.pidControllerService.getStatus().then(data => {
            this.pidControllers = data.json() as PidController[];
            for (let pidController of this.pidControllers) {
                pidController.newConfig = this.copyConfig(pidController.config);
            }
        });

        this.pidControllerObservable = this.socketService.getControllersData().subscribe((pidControllersData: PidControllerData[]) => {
            for (let pidController of this.pidControllers) {
                for (let data of pidControllersData) {
                    if (pidController.name === data.name) {
                        pidController.data = data;
                        break;
                    }
                }
            }
        });
    }

    getRowClass(valve: Valve) {
        let state = State[valve.status];

        if (valve.status === State[State.CLOSED])
            return "danger";
        else if (valve.status === State[State.OPENED])
            return "success";
        else
            return "";
    }

    private copyConfig(config: PidControllerConfig): PidControllerConfig {
        return {
            mode: config.mode,
            kp: config.kp,
            ki: config.ki,
            kd: config.kd,
            output: config.output,
            setPoint: config.setPoint
        }
    }

    togglePidCtrlMode(pidController: PidController) {
        let newMode = pidController.newConfig.mode.toLowerCase() === 'auto' ? 'manual' : 'auto';
        pidController.newConfig.mode = newMode;

        this.pidControllerService.setConfig(pidController.name, pidController.newConfig).then(data => {
            pidController.config = this.copyConfig(pidController.newConfig);
        });
    }

    setPidController(pidController: PidController) {
        this.pidControllerService.setConfig(pidController.name, pidController.newConfig).then(data => {
            pidController.config = this.copyConfig(pidController.newConfig);
        });
    }

    startClosingValve(valve: Valve) {
        this.valveService.setState(valve.name, State.START_CLOSE);
    }

    stopClosingValve(valve) {
        this.valveService.setState(valve.name, State.STOP_CLOSE);
    }

    startOpeningValve(valve) {
        this.valveService.setState(valve.name, State.START_OPEN);
    }

    stopOpeningValve(valve) {
        this.valveService.setState(valve.name, State.STOP_OPEN);
    }

    startMotor(motor: Motor) {
        this.pinService.write(motor.getPin(), PinValue.HIGH);
    }

    stopMotor(motor: Motor) {
        this.pinService.write(motor.getPin(), PinValue.LOW);
    }

}