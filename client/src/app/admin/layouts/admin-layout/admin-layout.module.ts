import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/kyc/kyc.component';
import { TeamComponent } from '../../pages/team/team.component';
import { AchievementComponent } from 'app/admin/pages/achievements/achievement.component';
import { SupportComponent } from '../../pages/support/support.component';
import { PayoutComponent } from '../../pages/payout/payout.component';
import { DepositComponent } from '../../pages/deposit/deposit.component';
import { PinManagementComponent } from 'app/admin/pages/pin-management/pin.component';
import { ReportComponent } from 'app/admin/pages/report/report.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PendingticketsComponent } from '../../pages/support/pendingtickets/pendingtickets.component';
import { SupporthistoryComponent } from '../../pages/support/supporthistory/supporthistory.component';

import { PendingkycComponent } from '../../pages/kyc/pendingkyc/pendingkyc.component';
import { ApprovedkycComponent } from '../../pages/kyc/approvedkyc/approvedkyc.component';

import { TeamAutopoolComponent } from '../../pages/team/autopool/teamautopool.component';
import { TeamUsersComponent } from '../../pages/team/users/teamusers.component';
import { EarningComponent } from '../../pages/team/users/earning/earning.component';

import { AchievementautopoolComponent } from 'app/admin/pages/achievements/achievementautopool/achievementautopool.component';
import { AchievementedntourComponent } from 'app/admin/pages/achievements/achievementedntour/achievementedntour.component';
import { AchievementgiftrewardsComponent } from 'app/admin/pages/achievements/achievementgiftrewards/achievementgiftrewards.component';

import { PendingpayoutComponent } from '../../pages/payout/pendingpayout/pendingpayout.component';
import { HistorypayoutComponent } from '../../pages/payout/historypayout/historypayout.component';

import { PendingdepositComponent } from '../../pages/deposit/pendingdeposit/pendingdeposit.component';
import { HistorydepositComponent } from '../../pages/deposit/historydeposit/historydeposit.component';

import { ManagePinsComponent } from 'app/admin/pages/pin-management/managepins/managepins.component';
import { GeneratePinsComponent } from 'app/admin/pages/pin-management/generatepins/generatepins.component';

import { ExportReportComponent } from 'app/admin/pages/report/export/export.component';

import { ProfileComponent } from '../../pages/settings/profile/profile.component';
import { PasswordComponent } from '../../pages/settings/password/password.component';
import { EarningdirectComponent } from 'app/admin/pages/team/users/earning/earningdirect/earningdirect.component';
import { EarninglevelComponent } from 'app/admin/pages/team/users/earning/earninglevel/earninglevel.component';
import { EarningautopoolComponent } from 'app/admin/pages/team/users/earning/earningautopool/earningautopool.component';
import { EarningedntourComponent } from 'app/admin/pages/team/users/earning/earningedntour/earningedntour.component';
import { EarninggiftrewardsComponent } from 'app/admin/pages/team/users/earning/earninggiftrewards/earninggiftrewards.component';
import { UserDetails } from 'app/admin/pages/team/users/earning/userdetails/userdetails.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsedPinsComponent } from 'app/admin/pages/pin-management/usedpins/usedpins.component';

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
    AchievementComponent,
    PayoutComponent,
    DepositComponent,
    PinManagementComponent,
    ReportComponent,

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

    AchievementautopoolComponent,
    AchievementedntourComponent,
    AchievementgiftrewardsComponent,

    PendingpayoutComponent,
    HistorypayoutComponent,
    
    HistorydepositComponent,
    PendingdepositComponent,

    GeneratePinsComponent,
    ManagePinsComponent,
    UsedPinsComponent,
    
    ExportReportComponent,

    ProfileComponent,
    PasswordComponent,
  ]
})

export class AdminLayoutModule {}
