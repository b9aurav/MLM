import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/kyc/kyc.component';
import { SupportComponent } from '../../pages/support/support.component';
import { TeamComponent } from '../../pages/team/team.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { PayoutComponent } from '../../pages/payout/payout.component';
import { DepositComponent } from '../../pages/deposit/deposit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin-dashboard', component: DashboardComponent },
    { path: 'admin-kyc', component: KYCComponent },
    { path: 'admin-team', component: TeamComponent },
    { path: 'admin-support', component: SupportComponent },
    { path: 'admin-payout', component: PayoutComponent},
    { path: 'admin-deposit', component: DepositComponent},
    { path: 'admin-settings', component: SettingsComponent }
];