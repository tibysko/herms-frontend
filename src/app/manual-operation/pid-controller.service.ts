import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { PidController } from './pid-controller.interface';

@Injectable()
export class PidControllerService {
    private url = environment.websocketUrl;
    private socket: any;
    private pidControllerObservable: any;

    constructor() {
        this.socket = io(this.url);

        this.pidControllerObservable = new Observable(observer => {
            this.socket.on('pid-controller', (pidController: PidController) => {
                observer.next(pidController);
            });
        });
    }

    getPidControllerObservable() {
        return this.pidControllerObservable;
    }
}