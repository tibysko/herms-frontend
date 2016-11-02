import {environment} from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

import { Pin } from '../model/pin.interface';

@Injectable()
export class SocketService {
    private url = environment.websocketUrl;
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

    getSocket(){
        return this.socket;
    }
}