import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Pin } from '../model/pin.interface';


@Injectable()
export class PinService{
    private apiUrl = 'http://192.168.1.146:8081/api/pins';
    private headers: Headers;

    constructor(private http: Http){
        this.headers = new Headers({'Content-Type': 'application/json'})
     }

    getPins() {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as Pin[]);
    }

    write(pin: Pin, value: boolean){
        //let url =`${this.apiUrl}/${pin.id}`;
        //let body = {'name': pin.id, 'value': value};

        //return this.http.post(url, body , this.headers)
          //  .toPromise();
    }

    read(pin: Pin){
        /*let url =`${this.apiUrl}/${pin.id}`;

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Pin);*/
    }
}