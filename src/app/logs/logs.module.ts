import { NgModule } from '@angular/core';
import { LogsComponent } from './logs.component';

import { LogsService } from './logs.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LogsComponent],
  exports: [LogsComponent],
  imports: [SharedModule],
  providers: [LogsService]
})
export class LogsModule { }