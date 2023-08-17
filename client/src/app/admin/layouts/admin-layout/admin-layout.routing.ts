import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/kyc/kyc.component';
import { SupportComponent } from '../../pages/support/support.component';
import { TeamComponent } from '../../pages/team/team.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { PayoutComponent } from '../../pages/payout/payout.component';
import { DepositComponent } from '../../pages/deposit/deposit.component';
import { PinManagementComponent } from 'app/admin/pages/pin-management/pin.component';
import { ReportComponent } from 'app/admin/pages/report/report.component';
import { AchievementComponent } from 'app/admin/pages/achievements/achievement.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin-dashboard', component: DashboardComponent },
    { path: 'admin-kyc', component: KYCComponent },
    { path: 'admin-team', component: TeamComponent },
    { path: 'admin-achievements', component: AchievementComponent },
    { path: 'admin-support', component: SupportComponent },
    { path: 'admin-payout', component: PayoutComponent},
    { path: 'admin-deposit', component: DepositComponent},
    { path: 'admin-manage-pins', component: PinManagementComponent },
    { path: 'admin-settings', component: SettingsComponent },
    { path: 'admin-report', component: ReportComponent }
];
