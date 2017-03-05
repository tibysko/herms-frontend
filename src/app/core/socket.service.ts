
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Pin } from '../model/pin.interface';
import { System } from './system.interface';
import { AppSettings } from './app-settings';
import { Valve } from '../model/valve.interface';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';

@Injectable()
export class SocketService {
    private system: Observable<{}>;
    private url = AppSettings.WEBSOCKET_ENDPOINT;
    private socket: any;
    private pins: Observable<Pin[]>;
    private valves: Observable<Valve[]>;
    private pidControllerData: Observable<PidControllerData[]>;
    private errors: Observable<string>;

    constructor() {
        this.socket = io(this.url);

        this.pins = new Observable(observer => {
            this.socket.on('pins', (pinData: Pin[]) => {
                observer.next(pinData);
            });
        });

        this.valves = new Observable(observer => {
            this.socket.on('valves', (valveData: Valve[]) => {
                observer.next(valveData);
            });
        });

        this.pidControllerData = new Observable(observer => {
            this.socket.on('controllers', (pidControllerData: PidControllerData[]) => {
                observer.next(pidControllerData);
            });
        });

        this.errors = new Observable(observer => {
            this.socket.on('error', (errorData: string) => {
                observer.next(errorData);
            });
        });

        this.system = new Observable(observer => {
            this.socket.on('system', (data: System) => {
                observer.next(data);
            })
        })
    }

    getPins(): Observable<Pin[]> {
        return this.pins;
    }

    getValves(): Observable<Valve[]> {
        return this.valves;
    }

    getControllersData(): Observable<PidControllerData[]> {
        return this.pidControllerData;
    }

    getError(): Observable<string> {
        return this.errors;
    }

    getSystem(): Observable<System> {
        return this.system;
    }
}