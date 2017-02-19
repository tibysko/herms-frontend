import { NgModule } from '@angular/core';
import { ProductionComponent } from './production.component';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  declarations: [ProductionComponent],
  exports: [ProductionComponent],
  imports: [ChartModule.forRoot(require('highcharts'))]
  
})
export class ProductionModule { }  