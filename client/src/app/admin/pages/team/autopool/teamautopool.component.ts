import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'TeamAutopool',
  templateUrl: './teamautopool.component.html',
  styleUrls: ['./teamautopool.component.css']
})
export class TeamAutopoolComponent implements OnInit {
  rows: any[];
  levels: number = 7;
  members: any[];
  toggleTable: boolean = false;
  searchTerm: string;
  userTracker: any[];

  settings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      user_id: {
        title: 'ID',
        width: '80px'
      },
      name: {
        title: 'Name'
      },
      username: {
        title: 'Username'
      },
      email: {
        title: 'E-Mail',
      },
      join_date: {
        title: 'Joining Date'
      },
      actions: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'More';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => this.getAutopoolTeam(instance.rowData.user_id, false));
        },
      }
    },
    pager: {
      perPage: 15,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    editable: false,
    noDataMessage: 'No users available.',
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { 
    this.rows = [];
    this.userTracker = [];
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.getFirstUserDetails()
    }
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
          this.userTracker.push(rootUser);
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
