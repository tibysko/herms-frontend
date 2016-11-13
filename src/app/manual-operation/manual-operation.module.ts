import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ManualOperationComponent } from './manual-operation.component';
import { SharedModule } from '../shared/shared.module';
import { PidControllerService } from './pid-controller.service';
import { ValveService } from './valve.service';


@NgModule({
  declarations: [ManualOperationComponent],
  exports: [ManualOperationComponent],
  imports: [SharedModule, FormsModule],
  providers: [PidControllerService, ValveService]
})
export class ManualOperationModule { }