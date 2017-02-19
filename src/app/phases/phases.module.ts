import { NgModule } from '@angular/core';
import { PhasesComponent } from './phases.component';
import { PhaseService } from './phase.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [PhasesComponent],
  exports: [PhasesComponent],
  imports: [ModalModule.forRoot(), SharedModule, FormsModule],
  providers: [PhaseService]
})
export class PhasesModule { }