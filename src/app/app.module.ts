import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { routing } from './app.routing';
import { AlarmModule } from './alarm/alarm.module';
import { AppComponent } from './app.component';
import { LogsModule } from './logs/logs.module';
import { CoreModule } from './core/core.module';
import { ManualOperationModule } from './manual-operation/manual-operation.module';
import { OverviewModule } from './overview/overview.module';
import { ParameterModule } from './parameter/parameter.module';
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
    ParameterModule,
    PhasesModule,
    ProductionModule,
    SimpleNotificationsModule,
    LogsModule
  ],
  bootstrap: [AppComponent],
  providers: [NotificationsService]
})
export class AppModule { }
