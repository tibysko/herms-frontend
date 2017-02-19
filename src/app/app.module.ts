import { BrowserModule } from '@angular/platform-browser';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { AlarmModule } from './alarm/alarm.module';
import { AppComponent } from './app.component';
import { LogsModule } from './logs/logs.module';
import { CoreModule } from './core/core.module';
import { DebugModule } from './debug/debug.module';
import { ManualOperationModule } from './manual-operation/manual-operation.module';
import { OverviewModule } from './overview/overview.module';
import { ParameterModule } from './parameter/parameter.module';
import { PhasesModule } from './phases/phases.module';
import { ProductionModule } from './production/production.module';
import { routing } from './app.routing';

export function highchartsFactory() {
  return require('highcharts');
}

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
    DebugModule,
    LogsModule,
    ManualOperationModule,
    OverviewModule,
    ParameterModule,
    PhasesModule,
    ProductionModule,
    SimpleNotificationsModule
  ],
  bootstrap: [AppComponent],
  providers: [NotificationsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }]
})
export class AppModule { }
