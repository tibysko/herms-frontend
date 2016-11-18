import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Log } from './log.interface';
import { AppSettings } from '../core/app-settings';

@Injectable()
export class LogsService {
    private apiUrl = AppSettings.API_ENDPOINT + '/logs';

    constructor(private http: Http) { }

    getErrorLog(): Promise<Log[]> {
        let url = `${this.apiUrl}/error`;

        return this.http.get(url).toPromise().then((res: Response) => {
            return res.json().dailyRotateFile as Log[];
        });
    }
}