import { Component, OnInit } from '@angular/core';
import { SocketService } from '../core/socket.service';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';

@Component({
    selector: 'production',
    templateUrl: 'production.component.html'
})

export class ProductionComponent {

    chart: any;
    options: any;
    redraw: boolean = false;
    shift: boolean = false;

    constructor(socketService: SocketService) {

        this.options = {
            chart: {
                type: 'spline',
                spacingBottom: 15,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 0
            },
            title: { text: '' },
            series: [
                { name: 'Pid controller HLT', id: 'pidCtrlHLT', data: [] },
                { name: 'Pid controller MLT', id: 'pidCtrlMLT', data: [] }
            ],
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                }
            }

        };

        socketService.getControllersData().subscribe((data: PidControllerData[]) => {
            this.shift = this.chart.series[0].data.length > 15; // 
            let now = new Date();

            this.chart.get('pidCtrlHLT').addPoint({ y: data[0].temperature, x: now }, this.redraw, this.shift);
            this.chart.get('pidCtrlMLT').addPoint({ y: data[1].temperature, x: now }, this.redraw, this.shift);

            this.chart.redraw();
        });
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
}