import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KYCComponent } from '../../pages/KYC/KYC.component';
import { SupportComponent } from '../../pages/Support/Support.component';
import { SettingsComponent } from '../../pages/settings/settings.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin-dashboard', component: DashboardComponent },
    { path: 'admin-kyc', component: KYCComponent },
    { path: 'admin-support', component: SupportComponent },
    { path: 'admin-settings', component: SettingsComponent }
];
