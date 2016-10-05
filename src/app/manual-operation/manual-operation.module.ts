import { NgModule }           from '@angular/core';

import {ManualOperationComponent} from './manual-operation.component';
import {SharedModule} from '../shared/shared.module';
import {PidControllerService} from './pid-controller.service';


@NgModule({
  declarations: [ ManualOperationComponent ],
  exports:      [ ManualOperationComponent ],
  imports: [SharedModule],
  providers: [PidControllerService]
})
export class ManualOperationModule { }