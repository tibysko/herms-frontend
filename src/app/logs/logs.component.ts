import { Component, OnInit } from '@angular/core';
import { LogsService } from './logs.service';
import { Log } from './log.interface';

@Component({
    selector: 'logs',
    templateUrl: 'logs.component.html'
})

export class LogsComponent implements OnInit {

    logs: Log[] = [];

    constructor(private logService: LogsService) {

    }

    ngOnInit() {
        this.logService.getErrorLog().then((logs: Log[]) => {
            this.logs = logs;
        });
    }
}