
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Pin } from '../model/pin.interface';
import { AppSettings } from './app-settings';
import { Valve } from '../model/valve.interface';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';

@Injectable()
export class SocketService {
    private url = AppSettings.WEBSOCKET_ENDPOINT;
    private socket: any;
    private pinsObservable: Observable<Pin[]>;
    private valvesObservable: Observable<Valve[]>;
    private pidControllersDataObservable: Observable<PidControllerData[]>;
    private errorObservable: Observable<string>;
    private levelControllerHltObservable: Observable<any>;

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

        this.errorObservable = new Observable(observer => {
            this.socket.on('error', (error: string) => {
                console.log('--- ' + error);
                observer.next(error);
            });
        });

        this.levelControllerHltObservable = new Observable(observer => {
            this.socket.on('LevelControllerHlt', (data: any) => {
                observer.next(data);
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

    getError(): Observable<string> {
        return this.errorObservable;
    }

    getLevelControllerHltData(): Observable<any> {
        return this.levelControllerHltObservable;
    }

}