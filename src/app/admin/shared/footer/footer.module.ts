import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminFooterComponent } from './footer.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ AdminFooterComponent ],
    exports: [ AdminFooterComponent ]
})

export class AdminFooterModule {}
