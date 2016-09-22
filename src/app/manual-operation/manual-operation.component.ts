import { Component, OnInit } from '@angular/core';

import { PinService } from './pin.service';
import { Pin } from '../model/pin.interface';

@Component({
    selector: 'manual-operation',
    templateUrl: 'manual-operation.component.html'
})

export class ManualOperationComponent implements OnInit {
    pins: Pin[] = [];
    pinsValves: any = [];
    showExtraPinInfo: boolean = false;
    
    constructor(
        private pinService : PinService

        

    ){ 
        this.pinsValves = [{
            name: "1",
            closed: "0",
            opened: "1"
        }];

    }

    ngOnInit(){
        this.pinService.getPins().then(pins => this.pins = pins);
    }

    operationOn(pin: Pin){
        this.pinService.write(pin, true);
    }

    operationOff(pin: Pin){
        this.pinService.write(pin, false);
    }

    operationRead(selectedPin: Pin){
        //let pinRow = this.pins.filter(pin => pin.id === selectedPin.id) as Pin[];

        //this.pinService.read(selectedPin).then(result => {
          //  if(pinRow.length > 0) pinRow[0].value = result.value;
        //});
    }

    togglePinInfo(){
        console.log('toogle');
        this.showExtraPinInfo = !this.showExtraPinInfo;
    }
}