import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualOperationComponent } from './manual-operation/manual-operation.component';
import { ParameterComponent } from './parameter/parameter.component'
import { OverviewComponent } from './overview/overview.component';
import { PhasesComponent } from './phases/phases.component';
import { ProductionComponent } from './production/production.component';
import { AlarmComponent } from './alarm/alarm.component';
import { LogsComponent } from './logs/logs.component';

const appRoutes: Routes = [
    {
        path: 'alarm',
        component: AlarmComponent
    },
    {
        path: 'manual-operation',
        component: ManualOperationComponent
    },
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: 'phases',
        component: PhasesComponent
    },
    {
        path: 'production',
        component: ProductionComponent
    },
    {
        path: 'logs',
        component: LogsComponent
    },
    {
        path: 'parameters',
        component: ParameterComponent
    },
    {
        path: '',
        redirectTo: '/overview',
        pathMatch: 'full'
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);