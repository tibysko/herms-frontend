import { NgModule } from '@angular/core';
import { ChartModule } from "angular2-highcharts";

import { ProductionComponent } from './production.component';

@NgModule({
  imports: [ChartModule],
  declarations: [ProductionComponent],
  exports: [ProductionComponent]
})
export class ProductionModule { }  