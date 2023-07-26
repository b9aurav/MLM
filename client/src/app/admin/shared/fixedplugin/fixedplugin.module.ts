import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminFixedPluginComponent } from './fixedplugin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ AdminFixedPluginComponent ],
    exports: [ AdminFixedPluginComponent ]
})

export class AdminFixedPluginModule {}
