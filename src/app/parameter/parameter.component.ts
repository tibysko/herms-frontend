import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Response } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

import { ParameterService } from './parameter.service';
import { Parameter } from './parameter.interface';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  @ViewChild('childModal') public parameterDialog: ModalDirective;

  modelValue: string = '';
  modelParameter: string = '';
  parameters: Map<String, Parameter> = new Map<String, Parameter>();

  constructor(private parameterService: ParameterService,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.parameterService.getParameters().then(paramters => {
      this.parameters = paramters;
    });
  }

  editParameter(name: string, value: string) {
    this.modelParameter = name;
    this.modelValue = value;
    this.parameterDialog.show();
  }

  getParameters() {
    this.parameterService.getParameters().then(paramters => {
      this.parameters = paramters;
    });
  }

  saveParameter(parameter: string, value: string) {
    this.parameterService.saveParameter(parameter, value).then((res: Response) => {
      this.getParameters();
      this.parameterDialog.hide();
      this.notificationsService.success('Parameter', 'Succesfully updated [' + parameter + ']');
    }).catch((reason) => {
      this.notificationsService.error('Parameter', 'Could not save [' + parameter + ']');
      this.parameterDialog.hide();
    });
  }
}
