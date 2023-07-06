import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  submenu: [{
    title: string;
    path: string;
  }]
}

export const ROUTES = [
  { path: '/dashboard', title: 'Dashboard', icon: 'bi bi-speedometer', class: '' },
  { path: '/team', title: 'Team', icon: 'bi bi-people-fill', class: '' },
  { path: '/earning', title: 'Earning', icon: 'bi bi-coin', class: '' },
  { path: '/deposit', title: 'Deposit', icon: 'bi bi-piggy-bank-fill', class: '' },
  { path: '/payout', title: 'Payout', icon: 'bi bi-cash-coin', class: '' },
  { path: '/kyc', title: 'KYC', icon: 'bi bi-file-earmark-check-fill', class: '' },
  { path: '/support', title: 'Support', icon: 'bi bi-envelope-paper-fill', class: '' },
  // { path: '/utility', title: 'Utility', icon: 'bi bi-tools', class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  user: any;
  public menuItems: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    var param = {
      "param": {
        "username": localStorage.getItem('mlm_user')
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetails', param).subscribe(response => {
      this.userService.setUser(response.data[0]);
      let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
      userLabel.innerText = this.userService.user.name
    }, error => console.error(error));
  }

  logout() {
    this.userService.setUser('');
    window.location.href = '/';
  }
}
