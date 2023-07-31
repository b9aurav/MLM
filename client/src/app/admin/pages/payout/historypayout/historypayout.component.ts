import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'HistoryPayout',
  templateUrl: './historypayout.component.html',
  styleUrls: ['./historypayout.component.css']
})
export class HistorypayoutComponent implements OnInit {
  requests: any[];

  requestSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "ID.": {
        title: 'Request ID',
        width: '80px'
      },
      user_id: {
        title: 'User ID'
      },
      username: {
        title: 'Username',
        width: '30%'
      },
      Amount: {
        title: 'Amount',
        filter: false,
      },
      Date: {
        title: 'Date',
        filter: false,
      },
      status: {
        title: 'Status',
        filter: false,
      },
      remarks: {
        title: 'Remarks',
        filter: false,
        width: '30%'
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

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadRespondedRequests();
    }
  }

  loadRespondedRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedWithdrawRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }
}
