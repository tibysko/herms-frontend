import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { CoreModule } from './core/core.module';
import { AlarmModule} from './alarm/alarm.module';
import { AppComponent } from './app.component';
import { ManualOperationModule } from './manual-operation/manual-operation.module';
import { OverviewModule } from './overview/overview.module';
import { PhasesModule } from './phases/phases.module';
import { ProductionModule } from './production/production.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AlarmModule,
    CoreModule,
    ManualOperationModule,
    OverviewModule,
    PhasesModule,
    ProductionModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
