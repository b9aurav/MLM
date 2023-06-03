import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/KYC/KYC.component';
import { SupportComponent } from '../../pages/Support/Support.component';
import { PayoutComponent } from '../../pages/Payout/Payout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PendingticketsComponent } from '../../pages/support/pendingtickets/pendingtickets.component';
import { SupporthistoryComponent } from '../../pages/support/supporthistory/supporthistory.component';

import { PendingkycComponent } from '../../pages/kyc/pendingkyc/pendingkyc.component';
import { ApprovedkycComponent } from '../../pages/kyc/approvedkyc/approvedkyc.component';

import { PendingpayoutComponent } from '../../pages/payout/pendingpayout/pendingpayout.component';
import { HistorypayoutComponent } from '../../pages/payout/historypayout/historypayout.component';

import { ProfileComponent } from '../../pages/settings/profile/profile.component';
import { PasswordComponent } from '../../pages/settings/password/password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    KYCComponent,
    SupportComponent,
    PayoutComponent,

    PendingticketsComponent,
    SupporthistoryComponent,

    PendingkycComponent,
    ApprovedkycComponent,

    PendingpayoutComponent,
    HistorypayoutComponent,
    
    ProfileComponent,
    PasswordComponent,
  ]
})

export class AdminLayoutModule {}
