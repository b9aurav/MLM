import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'EarningAutopool',
  templateUrl: './earningautopool.component.html',
  styleUrls: ['./earningautopool.component.css']
})
export class EarningautopoolComponent implements OnInit {
  rows: any[];

  levelSettings = {
    hideSubHeader: true,
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      level: {
        title: 'Level'
      },
      direct_members: {
        title: 'Required Direct Members'
      },
      level_members: {
        title: 'Required Level Members'
      },
      tour: {
        title: 'Education Tour'
      },
      achieved: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell) => {
          return cell ? 'Achieved' : 'Not Achieved';
        }
      },
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
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private selectedUser: UserService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        this.getAutopoolEarnings();
      }, 100);
    }
  }

  getAutopoolEarnings() {
    var param = {
      "param": {
        "user_id": this.selectedUser.getUser()
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolIncome', param).subscribe(response => {
      this.rows = response.data
    }, error => {
      console.error(error);
    });
  }

}