import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { Valve } from '../model/valve.interface';

export enum State {
    START_CLOSE,
    STOP_CLOSE,
    START_OPEN,
    STOP_OPEN,
    CLOSED,
    OPENED
}

@Injectable()
export class ValveService {
    private url = environment.websocketUrl;
    private apiUrl = environment.apiUrl + '/valves';

    constructor(private http: Http) {}

    setState(name: string, state: State) {
        let url = `${this.apiUrl}/${name}`;        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ state: State[state] });

        return this.http.post(url, body, options).toPromise();
    }
}