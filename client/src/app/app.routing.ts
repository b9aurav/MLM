import { Routes } from '@angular/router';

import { UserLayoutComponent } from './user/layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: UserLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./user/layouts/user-layout/user-layout.module').then(x => x.UserLayoutModule)
  }]},
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./admin/layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'dashboard',
    component: AppComponent
  }
]