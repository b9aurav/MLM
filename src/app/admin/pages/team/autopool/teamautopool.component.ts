import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'TeamAutopool',
  templateUrl: './teamautopool.component.html',
  styleUrls: ['./teamautopool.component.css']
})
export class TeamAutopoolComponent implements OnInit {
  user: any;
  rows: any[];
  levels: number = 7;
  members: any[];
  toggleTable: boolean = false;
  searchTerm: string;
  userTracker: number[];

  constructor(private http: HttpClient) { 
    this.rows = [];
    this.userTracker = [];
  }

  ngOnInit(): void {
    this.getFirstUserDetails()
  }

  getFirstUserDetails() {
    var param = {
      "param": {
        "user_id": 1
      } 
    }
    this.http.post<{ data: any, count: string, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsByUserID', param).subscribe(response => {
      this.members = response.data;
      this.toggleTable = false;
    }, error => {
      console.error(error);
    });
  }

  getAutopoolTeam(rootUser, isPrev) {
    var param = {
      "param": {
        "user_id": rootUser
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolMembers', param).subscribe(response => {
      this.members = response.data;
      this.toggleTable = true
      if (!isPrev) {
        if (rootUser != 1 || this.userTracker.length != 1) {
          this.userTracker.push(parseInt(rootUser));
        }
      } else {
        this.userTracker.pop();
      }
    }, error => {
      console.error(error);
    });
  }

  getPreviousMembers() {
    if (this.userTracker.length > 1) {
      this.getAutopoolTeam(this.userTracker.at(this.userTracker.length - 2), true)
    } else {
      this.getFirstUserDetails();
    }
  }
}
