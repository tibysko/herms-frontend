import { NgModule }           from '@angular/core';

import {ManualOperationComponent} from './manual-operation.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ ManualOperationComponent ],
  exports:      [ ManualOperationComponent ],
  imports: [SharedModule]
})
export class ManualOperationModule { }