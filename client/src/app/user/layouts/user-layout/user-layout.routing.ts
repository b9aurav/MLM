import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EarningComponent } from '../../pages/earning/earning.component';
import { KYCComponent } from '../../pages/kyc/kyc.component';
import { PayoutComponent } from '../../pages/payout/payout.component';
import { SupportComponent } from '../../pages/support/support.component';
import { TeamComponent } from '../../pages/team/team.component';
import { SettingsComponent } from '../../pages/settings/settings.component';

import { LoginComponent } from '../../../pages/login/login.component';
import { PinManagementComponent } from 'app/user/pages/pin-management/pin.component';

export const UserLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'manage-pins', component: PinManagementComponent },
    { path: 'earning', component: EarningComponent },
    { path: 'kyc', component: KYCComponent },
    { path: 'payout', component: PayoutComponent },
    { path: 'support', component: SupportComponent },
    { path: 'team', component: TeamComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'login', component: LoginComponent }
];
