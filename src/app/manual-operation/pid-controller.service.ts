import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { PidController } from './pid-controller.interface';
import { PidControllerConfig } from './pid-controller-config.interface';

@Injectable()
export class PidControllerService {
    private url = environment.websocketUrl;
    private socket: any;
    private pidControllerObservable: any;
    private apiUrl = environment.apiUrl + '/pid-controller';

    constructor(private http: Http) {
        this.socket = io(this.url);

        this.pidControllerObservable = new Observable(observer => {
            this.socket.on('pidController', (pidController: PidController) => {
                observer.next(pidController);
            });
        });
    }

    setConfig(config: PidControllerConfig): Promise<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(config);

        return this.http.post(this.apiUrl, body, options).toPromise();            
    }

    getStatus(): Promise<Response> {

        return this.http.get(this.apiUrl).toPromise();
    }

    getPidControllerObservable() {
        return this.pidControllerObservable;
    }
}