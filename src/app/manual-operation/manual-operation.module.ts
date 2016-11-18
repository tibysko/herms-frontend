import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ManualOperationComponent } from './manual-operation.component';
import { SharedModule } from '../shared/shared.module';
import { PidControllerService } from './pid-controller.service';
import { ValveService } from './valve.service';


@NgModule({
  declarations: [ManualOperationComponent],
  exports: [ManualOperationComponent],
  imports: [SharedModule, FormsModule, ModalModule],
  providers: [PidControllerService, ValveService]
})
export class ManualOperationModule { }