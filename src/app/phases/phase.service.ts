import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppSettings } from '../core/app-settings';
import { Phase } from './phase.interface';



@Injectable()
export class PhaseService {
    private apiUrl = AppSettings.API_ENDPOINT + '/phases';
    private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    private options: RequestOptions = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    createPhase(phase: Phase) {
        let body = JSON.stringify(phase)

        return this.http.post(this.apiUrl, body, this.options).toPromise();
    }

    updatePhase(phase: Phase) {
        let url = `${this.apiUrl}/${phase.id}`;

        return this.http.put(url, JSON.stringify(phase), this.options).toPromise();
    }

    activatePhase(id: string) {
        let url = `${this.apiUrl}/${id}/activate`;

        return this.http.put(url, this.options).toPromise();
    }

    deletePhase(id: string) {
        let url = `${this.apiUrl}/${id}`;

        return this.http.delete(url, this.options).toPromise();
    }

    getPhases(): Promise<Phase[]> {
        return this.http.get(this.apiUrl).toPromise().then((res: Response) => {
            return res.json() as Phase[];
        });
    }
}