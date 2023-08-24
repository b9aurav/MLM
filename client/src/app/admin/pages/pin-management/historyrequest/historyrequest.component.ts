import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'HistoryRequest',
  templateUrl: './historyrequest.component.html',
  styleUrls: ['./historyrequest.component.css']
})
export class HistoryPinRequestComponent implements OnInit {
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
        title: 'User ID',
        width: '80px'
      },
      username: {
        title: 'Username',
        width: "25%"
      },
      "Transaction No.": {
        title: 'Transaction No',
      },
      Date: {
        title: 'Date',
      },
      status: {
        title: 'Status',
        width: '80px'
      },
      remarks: {
        title: 'Remarks',
        width: '35%'
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


  constructor(private authService: AuthService,  private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadRespondedRequests();
    }
  }

  loadRespondedRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedDepositRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }
}
