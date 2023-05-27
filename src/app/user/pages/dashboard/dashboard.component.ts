import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserService } from '../../../services/user.service';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  user: any;
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  constructor(private userService: UserService, private http: HttpClient) {
  }

    ngOnInit(){
      
    }
}
