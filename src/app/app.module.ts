import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from '@angular/forms';

import { SidebarModule } from './user/sidebar/sidebar.module';
import { FooterModule } from './user/shared/footer/footer.module';
import { NavbarModule} from './user/shared/navbar/navbar.module';
import { FixedPluginModule} from './user/shared/fixedplugin/fixedplugin.module';

import { AdminSidebarModule } from './admin/sidebar/sidebar.module';
import { AdminFooterModule } from './admin/shared/footer/footer.module';
import { AdminNavbarModule} from './admin/shared/navbar/navbar.module';
import { AdminFixedPluginModule} from './admin/shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { UserLayoutComponent } from './user/layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './pages/login/login-routing.module';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationRoutingModule } from './pages/registration/registration-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    RegistrationComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    AdminSidebarModule,
    AdminFooterModule,
    AdminNavbarModule,
    AdminFixedPluginModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    LoginRoutingModule,
    RegistrationRoutingModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() { }
}
