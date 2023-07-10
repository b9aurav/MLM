import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

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
  public menuItems: any[];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    await this.authService.loadUserData();
    let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
    userLabel.innerText = this.authService.userData.name
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
