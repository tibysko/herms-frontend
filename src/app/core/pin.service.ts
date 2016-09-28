import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Pin } from '../model/pin.interface';
import { environment } from '../../environments/environment';

export class PinValue {
    public static HIGH: boolean = true;
    public static LOW: boolean = false;
}

@Injectable()
export class PinService {
    private apiUrl = environment.apiUrl + '/pins';
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' })
    }

    getPins() {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as Pin[]);
    }

    write(pinId: String, value: boolean) {
        let url = `${this.apiUrl}/${pinId}`;

        let body = JSON.stringify({ "pinValue": (value) ? "true" : "false" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options).toPromise()
            .then(response => console.log(response));
    }
}