import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'EarningDirect',
  templateUrl: './earningdirect.component.html',
  styleUrls: ['./earningdirect.component.css']
})
export class EarningdirectComponent implements OnInit {
  members: any[];
  directEarningsText: HTMLParagraphElement;
  referralText: HTMLParagraphElement;

  membersSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      index: {
        title: '#',
        width: '30px',
        type: 'text',
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
        filter: false
      },
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
      join_date: {
        title: 'Joining Date',
        width: '40px'
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
    noDataMessage: 'No members available.',
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        this.getDirectEarnings();
      }, 100);
      this.directEarningsText = document.getElementById('directIncomeText') as HTMLParagraphElement;
      this.referralText = document.getElementById('directMembersText') as HTMLParagraphElement;
    }
  }

  getDirectEarnings() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string, referrals: string, earnings: string }>(environment.apiBaseUrl + '/api/GetDirectEarnings', param).subscribe(response => {
      this.members = response.data;
      this.directEarningsText.textContent = 'Rs. ' + response.earnings;
      this.referralText.innerText = response.referrals;
    }, error => {
      console.error(error);
    });
  }

}
