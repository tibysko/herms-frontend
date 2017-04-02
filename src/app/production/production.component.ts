import { OnInit, Component, OnDestroy } from '@angular/core';
import { SocketService } from '../core/socket.service';
import { PidControllerData } from '../manual-operation/pid-controller-data.interface';
import { System } from "app/core/system.interface";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'production',
    templateUrl: 'production.component.html'
})

export class ProductionComponent implements OnDestroy, OnInit {
    pidControllerSubscription: Subscription;
    systemSubscription: Subscription;

    private readonly NR_OF_VISIBLE_DATA_POINTS = 15;
    chart: any;
    options: Object;
    redraw: boolean = false;
    shift: boolean = false;
     system: System = {
        HLT: {
            waterLevel: 0
        },
        HE: {
            HeHwInActPos: 0
        },
        MLT: {
            mltOutTemp: 0
        }
    };

    pidControllerData: PidControllerData = {
        name: '',
        output: '',
        temperature: ''
    };

    tempHLT: any;
    tempMLT: any;

    constructor(private socketService: SocketService) { }

    ngOnInit(): void {
        this.options = this.getChartOptions();
        this.setupChartData();
        this.setupSystemData();
    }

    ngOnDestroy(): void {
        this.pidControllerSubscription.unsubscribe();
        this.systemSubscription.unsubscribe();
    }

    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    private setupSystemData() {
        this.systemSubscription = this.pidControllerSubscription = this.socketService.getSystem().subscribe((data: System) => {
            this.system = data;
        });
    }

    private setupChartData() {
        this.pidControllerSubscription = this.socketService.getControllersData().subscribe((data: PidControllerData[]) => {
			this.tempHLT = data[0].temperature;
            this.tempMLT = data[1].temperature;
            
            this.shift = this.chart.series[0].data.length > this.NR_OF_VISIBLE_DATA_POINTS;
            let now = new Date();

            this.chart.get('MltOut').addPoint({ y: data[1].output, x: now }, this.redraw, this.shift);
            this.chart.get('MltTemp').addPoint({ y: data[1].temperature, x: now }, this.redraw, this.shift);
            this.chart.get('HeHwInPos').addPoint({ y: this.system.HE.HeHwInActPos, x: now }, this.redraw, this.shift);

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
                { name: 'MLT Output', id: 'MltOut', data: [] },
                { name: 'MLT Temperature', id: 'MltTemp', data: [] },
                { name: 'HE_HW_IN Act pos', id: 'HeHwInPos', data: [] }
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
                    text: 'Value'
                }
            }

        };
    }
}