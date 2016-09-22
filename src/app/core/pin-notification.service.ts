import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

import { Pin } from '../model/pin.interface';

@Injectable()
export class PinNotificationService {
    private url = 'http://localhost:8080';
    private socket: any;
    private pinsObservable: any;

    constructor() {
        this.socket = io(this.url);

        this.pinsObservable = new Observable(observer => {
            this.socket.on('pins', (data) => {
                observer.next(data);
            });
        });
    }

    getPinsObservable() {
        return this.pinsObservable;
    }
}