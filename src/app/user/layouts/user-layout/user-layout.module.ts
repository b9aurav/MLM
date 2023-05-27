import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserLayoutRoutes } from './user-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DepositComponent } from '../../pages/deposit/Deposit.component';
import { EarningComponent } from '../../pages/earning/Earning.Component';
import { KYCComponent } from '../../pages/KYC/KYC.component';
import { PayoutComponent } from '../../pages/Payout/Payout.component';
import { SupportComponent } from '../../pages/Support/Support.component';
import { TeamComponent } from '../../pages/Team/Team.component';
import { UtilityComponent } from '../../pages/Utility/Utility.component';
import { SettingsComponent } from '../../pages/Settings/Settings.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TeamDirectComponent } from '../../pages/team/direct/teamdirect.component';
import { TeamLevelComponent } from '../../pages/team/level/teamlevel.component';
import { TeamAutopoolComponent } from '../../pages/team/autopool/teamautopool.component';

import { EarningautopoolComponent } from '../../pages/earning/earningautopool/earningautopool.component';
import { EarningdirectComponent } from '../../pages/earning/earningdirect/earningdirect.component';
import { EarningedntourComponent } from '../../pages/earning/earningedntour/earningedntour.component';
import { EarninggiftrewardsComponent } from '../../pages/earning/earninggiftrewards/earninggiftrewards.component';

import { DepositfundComponent } from '../../pages/deposit/depositfund/depositfund.component';
import { DeposithistoryComponent } from '../../pages/deposit/deposithistory/deposithistory.component';

import { PayoutwithdrawComponent } from '../../pages/payout/payoutwithdraw/payoutwithdraw.component';
import { PayouthistoryComponent } from '../../pages/payout/payouthistory/payouthistory.component';

import { SupportticketComponent } from '../../pages/support/supportticket/supportticket.component';
import { SupporthistoryComponent } from '../../pages/support/supporthistory/supporthistory.component';

import { ProfileComponent } from '../../pages/settings/profile/profile.component';
import { PasswordComponent } from '../../pages/settings/password/password.component';
import { LoginComponent } from '../../../pages/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    DepositComponent,
    EarningComponent,
    KYCComponent,
    PayoutComponent,
    SupportComponent,
    TeamComponent,
    UtilityComponent,
    SettingsComponent,
    LoginComponent,
    TeamDirectComponent,
    TeamLevelComponent,
    TeamAutopoolComponent,

    EarningautopoolComponent,
    EarningdirectComponent,
    EarningedntourComponent,
    EarninggiftrewardsComponent,

    DepositfundComponent,
    DeposithistoryComponent,

    PayoutwithdrawComponent,
    PayouthistoryComponent,

    SupportticketComponent,
    SupporthistoryComponent,

    ProfileComponent,
    PasswordComponent,
  ]
})

export class UserLayoutModule {}
