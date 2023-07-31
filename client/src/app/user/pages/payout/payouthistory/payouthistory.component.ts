import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'PayoutHistory',
  templateUrl: './payouthistory.component.html',
  styleUrls: ['./payouthistory.component.css']
})
export class PayouthistoryComponent implements OnInit {
  transactions: any[];

  requestSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "Request ID.": {
        title: 'Request ID',
        width: '80px'
      },
      Amount: {
        title: 'Amount'
      },
      Date: {
        title: 'Date Time',
        width: '170px'
      },
      Status: {
        title: 'Status',
        filter: false,
        width: '80px'
      },
      Remarks: {
        title: 'Remarks',
        width: '50%'
      },
      actions: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'Delete';
          instance.rowData = instance.row;
          instance.onClick.subscribe(() => this.showDeletePopup(instance.rowData));
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
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadTransactions();
    }
  }

  loadTransactions() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetWithdrawRequests', param).subscribe(response => {
      this.transactions = response.data;
    }, error => {
      console.error(error);
    });
  }

  showDeletePopup(request_id) {
    let result = confirm("Are you sure want to delete this request?");
    if (result) {
      var param = {
        "param": {
          "request_id": request_id
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DeleteWithdrawRequest', param).subscribe(response => {
        alert(response.message);
        this.loadTransactions();
      }, error => {
        console.error(error);
        this.loadTransactions();
      });
    }
  }
}
