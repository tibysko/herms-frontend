
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesPipe } from '../core/values.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ValuesPipe],
    exports: [CommonModule, ValuesPipe]
})
export class SharedModule { }