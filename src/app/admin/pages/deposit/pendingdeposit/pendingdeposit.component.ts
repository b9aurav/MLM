import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'PendingDeposit',
  templateUrl: './pendingdeposit.component.html',
  styleUrls: ['./pendingdeposit.component.css']
})
export class PendingdepositComponent implements OnInit {
  requests: any[];
  selectedRequest: string;
  statusModel: any;
  requestidInput: HTMLInputElement;
  datetimeInput: HTMLInputElement;
  useridInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  transactionNoInput: HTMLInputElement;
  amountInput: HTMLInputElement;
  statusDropdown: HTMLSelectElement;
  remarksTextArea: HTMLTextAreaElement;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadPendingDepositRequests()
      this.requestidInput = document.getElementById("requestidInput") as HTMLInputElement;
      this.datetimeInput = document.getElementById("DateTimeInput") as HTMLInputElement;
      this.useridInput = document.getElementById("useridInput") as HTMLInputElement;
      this.usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
      this.transactionNoInput = document.getElementById("transactionNoInput") as HTMLInputElement;
      this.amountInput = document.getElementById("amountInput") as HTMLInputElement;
      this.statusDropdown = document.getElementById("statusDropdown") as HTMLSelectElement;
      this.remarksTextArea = document.getElementById("remarksTextarea") as HTMLTextAreaElement;
    }
  }

  loadPendingDepositRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetPendingDepositRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }

  showPopup(request_id: string,
    user_id: string,
    username: string,
    transaction_no: string,
    date: string) {
    this.statusDropdown.selectedIndex = 0;
    this.remarksTextArea.value = "";
    $('.ui.modal.pending-depositrequest').modal({
      closable: false,
    }).modal('show');
    this.selectedRequest = request_id;
    this.requestidInput.value = request_id;
    this.datetimeInput.value = date;
    this.useridInput.value = user_id;
    this.usernameInput.value = username;
    this.transactionNoInput.value = transaction_no;
    $('.ui.dimmer').addClass('inverted');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(0.5)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(0.5)' })
    $('.nav').css({ 'filter': 'opacity(0.5)', 'pointer-events': 'none' })
  }

  hidePopup() {
    this.selectedRequest = null;
    $('.ui.modal.pending-depositrequest').modal('hide');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(1)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(1)' })
    $('.nav').css({ 'filter': 'opacity(1)', 'pointer-events': 'auto' })
  }

  submit() {
    if (this.statusDropdown.selectedIndex == 0) {
      alert('Error : Please select status')
    } else {
      var amount = null;
      if (this.statusModel == "Succeed") {
        amount = this.amountInput.value;
        if (this.amountInput.value == "") {
          alert('Error : Please enter amount')
          return;
        }
      }
      var param = {
        "param": {
          "request_id": this.selectedRequest,
          "amount": amount,
          "status": this.statusDropdown.value,
          "remarks": this.remarksTextArea.value
        }
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/RespondDepositRequest', param).subscribe(response => {
        alert(response.message);
        this.hidePopup();
        this.loadPendingDepositRequests();
      }, error => {
        console.error(error);
        this.hidePopup();
      });
    }
  }
}
