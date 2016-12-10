import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppSettings } from '../core/app-settings';
import { Valve, ValveState } from '../model/valve.interface';

@Injectable()
export class ValveService {
    private apiUrl = AppSettings.API_ENDPOINT + '/valves';
    private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    private options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    setState(name: string, state: ValveState) {
        let url = `${this.apiUrl}/${name}`;
        let body = JSON.stringify({ state: ValveState[state] });

        return this.http.post(url, body, this.options).toPromise();
    }

    getValves() {
        return this.http.get(this.apiUrl).toPromise().then((res: Response) => {
            let valves = res.json();
            let valvesToReturn: Valve[] = [];

            for (let valve of valves) {
                valvesToReturn.push({
                    name: valve.name,
                    state: ValveState[<string>valve.state]
                });
            }

            return valvesToReturn;
        });
    }
}