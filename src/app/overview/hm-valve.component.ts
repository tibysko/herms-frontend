import { Component, Input, OnInit } from '@angular/core';

import { Valve } from '../model/valve';

@Component({
    selector: '[hm-valve]',
    template: `
        <svg:g [attr.transform]="rotate">
            <svg:polygon [attr.points]="triangleTopPoints" [attr.fill]="valve.color"  />        
            <svg:polygon [attr.points]="triangleBottomPoints" [attr.fill]="valve.color" />
        </svg:g>
    `
})

export class ValveComponent implements OnInit {
    triangleTopPoints: String;
    triangleBottomPoints: String;
    private height:number = 16;
    
    @Input()
    valve: Valve;

    rotate: String;

    static COLOR_BLACK: String = `rgba(0, 0, 0,1)`;
    static COLOR_GREEN: String = `rgba(0, 255, 0,1)`;
    static COLOR_RED: String = `rgba(255, 0, 0,1)`;

    ngOnInit() {
        /*if (this.valve.rotate) {
            this.triangleTopPoints = `${this.valve.x},${this.valve.y}  ${this.height + this.valve.x},${this.height/2 + this.valve.y}  ${this.valve.x},${this.height + this.valve.y}`;
            this.triangleBottomPoints = `${this.height * 2 + this.valve.x},${this.valve.y}  ${this.height*2 + this.valve.x},${this.height + this.valve.y}  ${this.height + this.valve.x},${this.height/2 + this.valve.y}`;
        } else {
            this.triangleTopPoints = `${this.valve.x},${this.valve.y}  ${this.height + this.valve.x},${this.valve.y}  ${this.height/2 + this.valve.x},${this.height + this.valve.y}`;
            this.triangleBottomPoints = `${this.valve.x},${this.height*2 + this.valve.y}  ${this.height + this.valve.x},${this.height*2 + this.valve.y}  ${this.height/2 + this.valve.x},${this.height + this.valve.y}`;
        }*/
    }
}