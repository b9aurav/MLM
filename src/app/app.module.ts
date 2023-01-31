import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { UserService } from './services/user.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    // HttpClient,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  // private userService: UserService, private http: HttpClient
  constructor() {
    // var param = {
    //   "param": {
    //     "username": "gaurav"
    //   }
    // }
    // console.log(this.userService.user)
    // this.http.post('api/GetUserDetails', param).subscribe(data => {
    //   console.log(data);
    // });
  }
}
