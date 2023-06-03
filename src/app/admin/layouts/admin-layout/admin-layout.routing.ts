import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/kyc/KYC.component';
import { SupportComponent } from '../../pages/Support/Support.component';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { PayoutComponent } from '../../pages/Payout/Payout.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin-dashboard', component: DashboardComponent },
    { path: 'admin-kyc', component: KYCComponent },
    { path: 'admin-support', component: SupportComponent },
    { path: 'admin-payout', component: PayoutComponent},
    { path: 'admin-settings', component: SettingsComponent }
];
