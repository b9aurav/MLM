import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';

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
  { path: '/admin-dashboard', title: 'Dashboard', icon: 'bi bi-speedometer', class: '' },
  { path: '/admin-team', title: 'Teams', icon: 'bi bi-people-fill', class: '' },
  { path: '/admin-payout', title: 'Payout', icon: 'bi bi-cash-coin', class: '' },
  { path: '/admin-deposit', title: 'Deposit', icon: 'bi bi-piggy-bank-fill', class: '' },
  { path: '/admin-kyc', title: 'KYC', icon: 'bi bi-file-earmark-check-fill', class: '' },
  { path: '/admin-support', title: 'Support', icon: 'bi bi-envelope-paper-fill', class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'admin-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class AdminSidebarComponent implements OnInit {
  public menuItems: any[];

  constructor(private authService: AuthService,  private http: HttpClient) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
    userLabel.innerText = 'ADMIN'
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
