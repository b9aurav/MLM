import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'PendingPayout',
  templateUrl: './pendingpayout.component.html',
  styleUrls: ['./pendingpayout.component.css']
})
export class PendingpayoutComponent implements OnInit {
  requests: any[];
  selectedRequest: string;
  requestidInput: HTMLInputElement;
  datetimeInput: HTMLInputElement;
  useridInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  amountInput: HTMLInputElement;
  userbalanceInput: HTMLInputElement;
  statusDropdown: HTMLSelectElement;
  remarksTextArea: HTMLTextAreaElement;

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
      "User Balance": {
        title: 'User Balance',
        filter: false
      },
      Date: {
        title: 'Date',
      },
      action: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'Proceed';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => this.showPopup(
            instance.rowData["ID."],
            instance.rowData.user_id,
            instance.rowData.username,
            instance.rowData.Amount,
            instance.rowData["User Balance"],
            instance.rowData.Date
          ));
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
      this.loadPendingWithdrawRequests()
      this.requestidInput = document.getElementById("requestidInput") as HTMLInputElement;
      this.datetimeInput = document.getElementById("DateTimeInput") as HTMLInputElement;
      this.useridInput = document.getElementById("useridInput") as HTMLInputElement;
      this.usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
      this.amountInput = document.getElementById("amountInput") as HTMLInputElement;
      this.userbalanceInput = document.getElementById("userbalanceInput") as HTMLInputElement;
      this.statusDropdown = document.getElementById("statusDropdown") as HTMLSelectElement;
      this.remarksTextArea = document.getElementById("remarksTextarea") as HTMLTextAreaElement;
    }
  }

  loadPendingWithdrawRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetPendingWithdrawRequests', null).subscribe(response => {
      this.requests = response.data;  
    }, error => {
      console.error(error);
    });
  }

  showPopup(request_id: string, 
    user_id: string, 
    username: string,
    amount: string,
    balance: string,
    date: string) {
    this.statusDropdown.selectedIndex = 0;
    this.remarksTextArea.value = "";
    $('.ui.modal.pending-withdrawrequest').modal({
      closable: false, 
    }).modal('show');
    this.selectedRequest = request_id;
    this.requestidInput.value = request_id;
    this.datetimeInput.value = date;
    this.useridInput.value = user_id;
    this.usernameInput.value = username;
    this.amountInput.value = amount;
    this.userbalanceInput.value = balance;
    $('.ui.dimmer').addClass('inverted');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(0.5)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(0.5)' })
    $('.nav').css({ 'filter': 'opacity(0.5)', 'pointer-events': 'none' })
  }

  hidePopup() {
    this.selectedRequest = null;
    $('.ui.modal.pending-withdrawrequest').modal('hide');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(1)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(1)' })
    $('.nav').css({ 'filter': 'opacity(1)', 'pointer-events': 'auto' })
  }

  submit() {
    if (this.statusDropdown.selectedIndex == 0) {
      alert('Error : Please select status')
    } else {
      var param = {
        "param": {
          "request_id": this.selectedRequest,
          "status": this.statusDropdown.value,
          "remarks": this.remarksTextArea.value
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/RespondWithdrawRequest', param).subscribe(response => {
        alert(response.message);
        this.hidePopup();
        this.loadPendingWithdrawRequests();
      }, error => {
        console.error(error);
        this.hidePopup();
      });
    }
  }
}
