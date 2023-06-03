import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

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

  constructor(private userService: UserService,  private http: HttpClient) { }

  ngOnInit(): void { 
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
