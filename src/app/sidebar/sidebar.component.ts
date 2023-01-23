import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';


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
  { path: '/utility', title: 'Utility', icon: 'bi bi-tools', class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
