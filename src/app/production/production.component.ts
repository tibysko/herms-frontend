import { Component, OnInit } from '@angular/core';
import { SocketService } from '../core/socket.service';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';
import { System } from "app/core/system.interface";

@Component({
    selector: 'production',
    templateUrl: 'production.component.html'
})

export class ProductionComponent {

    private readonly NR_OF_VISIBLE_DATA_POINTS = 15;
    chart: any;
    options: Object;
    redraw: boolean = false;
    shift: boolean = false;
    system: System = {
        HLT: {
            waterLevel: 0
        }
    };

    constructor(private socketService: SocketService) {
        this.options = this.getChartOptions();
        this.setupChartData();
        this.setupSystemData();
    }
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    private setupSystemData(){
        this.socketService.getSystem().subscribe((data: System) => {
            this.system = data;
        });
    }

    private setupChartData() {
        this.socketService.getControllersData().subscribe((data: PidControllerData[]) => {
            this.shift = this.chart.series[0].data.length > this.NR_OF_VISIBLE_DATA_POINTS; 
            let now = new Date();

            this.chart.get('pidCtrlHLT').addPoint({ y: data[0].temperature, x: now }, this.redraw, this.shift);
            this.chart.get('pidCtrlMLT').addPoint({ y: data[1].temperature, x: now }, this.redraw, this.shift);

            this.chart.redraw();
        });
    }

    private getChartOptions() {
        return this.options = {
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
    }
}