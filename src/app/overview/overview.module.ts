import { NgModule }           from '@angular/core';
import {OverviewComponent} from './overview.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ OverviewComponent],
  exports:      [ OverviewComponent],
  imports: [SharedModule]
})
export class OverviewModule { }