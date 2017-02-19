import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap';

import { ParameterComponent } from './parameter.component';
import { ParameterService } from './parameter.service';
import { SharedModule } from '../shared/shared.module';
import { ValuesPipe } from '../core/values.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ModalModule.forRoot(), SharedModule],
  providers: [ParameterService],
  exports: [ParameterComponent],
  declarations: [ParameterComponent]
})
export class ParameterModule { }
