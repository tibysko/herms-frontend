declare var $: any;

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { Valve, ValveState } from '../model/valve.interface';
import { Motor } from '../model/motor';
import { Pin } from '../model/pin.interface';
import { PinService, PinValue } from '../core/pin.service';
import { PidController } from './pid-controller.interface';
import { PidControllerConfig } from './pid-controller-config.interface';
import { PidControllerData } from './pid-controller-data.interface';
import { PidControllerModal } from './pid-controller-modal';
import { PidControllerService } from './pid-controller.service';
import { ValveService } from './valve.service';
import { SocketService } from '../core/socket.service';

@Component({
    selector: 'manual-operation',
    templateUrl: 'manual-operation.component.html'
})

export class ManualOperationComponent implements OnInit, AfterViewInit {
    @ViewChild('childModal') public pidControllerModal: ModalDirective;

    motors: Motor[] = [];
    valves: Valve[] = [];
    valvesObservable: any;
    pidControllerObservable: any;
    pidControllers: PidController[] = [];

    modeToggles = [
        { value: 'auto', display: 'Auto' },
        { value: 'manual', display: 'Manual' },
    ];

    modal: PidControllerModal = {
        mode: '',
        kp: 0,
        ki: 0,
        kd: 0,
        output: 0,
        setPoint: 0,
        name: '',
        longName: ''
    }

    constructor(private pinService: PinService,
        private socketService: SocketService,
        private pidControllerService: PidControllerService,
        private valveService: ValveService,
        private notificationsService: NotificationsService) {

        this.motors.push(new Motor('HW_PUMP', 'HW_PUMP'));
        this.motors.push(new Motor('WORT_PUMP', 'WORT_PUMP'));
    }

    ngAfterViewInit() {
        // Init material js
        $.material.init();
    }

    openPidControllerModal(pidController: PidController) {
        let config = pidController.config;
        this.modal = {
            mode: config.mode,
            kp: config.kp,
            ki: config.ki,
            kd: config.kd,
            name: pidController.name,
            output: config.output,
            setPoint: config.setPoint,
            longName: pidController.longName
        }

        this.pidControllerModal.show();
    }

    ngOnInit() {
        this.valvesObservable = this.socketService.getValves().subscribe((data: Valve[]) => {
            this.valves = data.sort();
        });

        this.pidControllerService.getStatus().then(data => {
            this.pidControllers = data.json() as PidController[];
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
        let state = ValveState[valve.state];
        
        if (state === ValveState.CLOSED)
            return "danger";
        else if (state === ValveState.OPENED) {
            return "success";
        } else
            return "";
    }

    setPidController(modal: PidControllerModal) {
        let config: PidControllerConfig = {
            mode: modal.mode,
            kp: modal.kp,
            ki: modal.ki,
            kd: modal.kd,
            output: modal.output,
            setPoint: modal.setPoint
        }

        this.pidControllerService.setConfig(modal.name, config).then(data => {
            let controllers: PidController[] = this.pidControllers.filter(controller => { return controller.name === modal.name });
            controllers[0].config = config; // should allways return 1 controller          

            this.pidControllerModal.hide();
            this.notificationsService.success('Pid controller', 'Successfully updated config for ' + modal.longName);
        });
    }

    startClosingValve(valve: Valve) {
        this.valveService.setState(valve.name, ValveState.START_CLOSE);
    }

    stopClosingValve(valve) {
        this.valveService.setState(valve.name, ValveState.STOP_CLOSE);
    }

    startOpeningValve(valve) {
        this.valveService.setState(valve.name, ValveState.START_OPEN);
    }

    stopOpeningValve(valve) {
        this.valveService.setState(valve.name, ValveState.STOP_OPEN);
    }

    startMotor(motor: Motor) {
        this.pinService.write(motor.getPin(), PinValue.HIGH);
    }

    stopMotor(motor: Motor) {
        this.pinService.write(motor.getPin(), PinValue.LOW);
    }

}