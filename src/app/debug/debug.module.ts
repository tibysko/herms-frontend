import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebugComponent } from './debug.component';
import { SharedModule } from '../shared/shared.module';

import { ValuesPipe } from '../core/values.pipe';


@NgModule({
  declarations: [DebugComponent],
  exports: [DebugComponent],
  imports: [SharedModule]
})
export class DebugModule { }
