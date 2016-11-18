import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { PidController } from './pid-controller.interface';
import { PidControllerConfig } from './pid-controller-config.interface';
import {AppSettings} from '../core/app-settings';

@Injectable()
export class PidControllerService {
   
    private apiUrl = AppSettings.API_ENDPOINT + '/pid-controllers';

    constructor(private http: Http) { }

    setConfig(controllerName: string, config: PidControllerConfig): Promise<Response> {
        let url = `${this.apiUrl}/${controllerName}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(config);

        return this.http.post(url, body, options).toPromise();            
    }

    getStatus(): Promise<Response> {
        return this.http.get(this.apiUrl).toPromise();
    }
}