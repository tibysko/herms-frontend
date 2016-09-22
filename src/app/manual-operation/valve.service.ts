import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Pin} from '../model/pin.interface';


@Injectable()
export class ValveService {
    private url = 'http://localhost:8080';
    private socket: any;
    private observable: any;

    constructor() { }

    getPins() {
      
    }
}