import { NgModule }           from '@angular/core';
import {ManualOperationComponent} from './manual-operation.component';
import {PinService} from './pin.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ ManualOperationComponent ],
  exports:      [ ManualOperationComponent ],
  providers:    [ PinService ],
  imports: [SharedModule]
})
export class ManualOperationModule { }