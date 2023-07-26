import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/KYC/KYC.component';
import { TeamComponent } from '../../pages/Team/Team.component';
import { SupportComponent } from '../../pages/Support/Support.component';
import { PayoutComponent } from '../../pages/Payout/Payout.component';
import { DepositComponent } from '../../pages/deposit/Deposit.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PendingticketsComponent } from '../../pages/support/pendingtickets/pendingtickets.component';
import { SupporthistoryComponent } from '../../pages/support/supporthistory/supporthistory.component';

import { PendingkycComponent } from '../../pages/kyc/pendingkyc/pendingkyc.component';
import { ApprovedkycComponent } from '../../pages/kyc/approvedkyc/approvedkyc.component';

import { TeamAutopoolComponent } from '../../pages/team/autopool/teamautopool.component';
import { TeamUsersComponent } from '../../pages/team/users/teamusers.component';
import { EarningComponent } from '../../pages/team/users/earning/earning.component';

import { PendingpayoutComponent } from '../../pages/payout/pendingpayout/pendingpayout.component';
import { HistorypayoutComponent } from '../../pages/payout/historypayout/historypayout.component';

import { PendingdepositComponent } from '../../pages/deposit/pendingdeposit/pendingdeposit.component';
import { HistorydepositComponent } from '../../pages/deposit/historydeposit/historydeposit.component';

import { ProfileComponent } from '../../pages/settings/profile/profile.component';
import { PasswordComponent } from '../../pages/settings/password/password.component';
import { EarningdirectComponent } from 'app/admin/pages/team/users/earning/earningdirect/earningdirect.component';
import { EarninglevelComponent } from 'app/admin/pages/team/users/earning/earninglevel/earninglevel.component';
import { EarningautopoolComponent } from 'app/admin/pages/team/users/earning/earningautopool/earningautopool.component';
import { EarningedntourComponent } from 'app/admin/pages/team/users/earning/earningedntour/earningedntour.component';
import { EarninggiftrewardsComponent } from 'app/admin/pages/team/users/earning/earninggiftrewards/earninggiftrewards.component';
import { UserDetails } from 'app/admin/pages/team/users/earning/userdetails/userdetails.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DashboardComponent,
    KYCComponent,
    SupportComponent,
    TeamComponent,
    PayoutComponent,
    DepositComponent,

    PendingticketsComponent,
    SupporthistoryComponent,

    PendingkycComponent,
    ApprovedkycComponent,

    TeamAutopoolComponent,
    TeamUsersComponent,
    EarningComponent,
    EarningdirectComponent,
    EarninglevelComponent,
    EarningautopoolComponent,
    EarningedntourComponent,
    EarninggiftrewardsComponent,
    UserDetails,

    PendingpayoutComponent,
    HistorypayoutComponent,
    
    HistorydepositComponent,
    PendingdepositComponent,
    
    ProfileComponent,
    PasswordComponent,
  ]
})

export class AdminLayoutModule {}
