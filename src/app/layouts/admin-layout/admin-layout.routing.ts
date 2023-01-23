import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DepositComponent } from '../../pages/deposit/Deposit.component';
import { EarningComponent } from '../../pages/Earning/Earning.Component';
import { KYCComponent } from '../../pages/KYC/KYC.component';
import { PayoutComponent } from '../../pages/Payout/Payout.component';
import { SupportComponent } from '../../pages/Support/Support.component';
import { TeamComponent } from '../../pages/Team/Team.component';
import { UtilityComponent } from '../../pages/Utility/Utility.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'deposit', component: DepositComponent },
    { path: 'earning', component: EarningComponent },
    { path: 'kyc', component: KYCComponent },
    { path: 'payout', component: PayoutComponent },
    { path: 'support', component: SupportComponent },
    { path: 'team', component: TeamComponent },
    { path: 'utility', component: UtilityComponent }
];
