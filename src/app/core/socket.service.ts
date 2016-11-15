
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Pin } from '../model/pin.interface';
import {AppSettings} from './app-settings';
import { Valve } from '../model/valve.interface';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';

@Injectable()
export class SocketService {
    private url = AppSettings.WEBSOCKET_ENDPOINT;
    private socket: any;
    private pinsObservable: Observable<Pin[]>;
    private valvesObservable: Observable<Valve[]>;
    private pidControllersDataObservable: Observable<PidControllerData[]>;

    constructor() {
        this.socket = io(this.url);

        this.pinsObservable = new Observable(observer => {
            this.socket.on('pins', (pins: Pin[]) => {
                observer.next(pins);
            });
        });

        this.valvesObservable = new Observable(observer => {
            this.socket.on('valves', (valves: Valve[]) => {
                observer.next(valves);
            });
        });

        this.pidControllersDataObservable = new Observable(observer => {
            this.socket.on('controllers', (pidControllers: PidControllerData[]) => {
                observer.next(pidControllers);
            });
        });
    }

    getPins(): Observable<Pin[]> {
        return this.pinsObservable;
    }

    getValves(): Observable<Valve[]> {
        return this.valvesObservable;
    }

    getControllersData(): Observable<PidControllerData[]> {
        return this.pidControllersDataObservable;
    }
}