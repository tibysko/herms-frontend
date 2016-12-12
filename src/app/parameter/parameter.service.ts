import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { AppSettings } from '../core/app-settings';
import { Parameter } from './parameter.interface';

@Injectable()
export class ParameterService {
  private apiUrl = AppSettings.API_ENDPOINT + '/parameters';
  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getParameters(): Promise<Map<string, Parameter>> {
    return this.http.get(this.apiUrl).toPromise()
      .then(response => response.json() as Map<string, Parameter>);
  }

  saveParameter(parameter: string, value: string) {
    let url = `${this.apiUrl}/${parameter}`;
    let body = { value: value };
    
    return this.http.put(url, body, this.options).toPromise();
  } 
}
