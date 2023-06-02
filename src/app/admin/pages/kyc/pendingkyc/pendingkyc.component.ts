import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import * as semantic from "semantic-ui-modal"

@Component({
  selector: 'PendingKYC',
  templateUrl: './pendingkyc.component.html',
  styleUrls: ['./pendingkyc.component.css']
})

export class PendingkycComponent {
  requests: any[];
  selectedRequest: string;
  nameInput: HTMLInputElement;
  useridInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  registeredonInput: HTMLInputElement;
  sponsoridInput: HTMLInputElement;
  bankAcNoInput: HTMLInputElement;
  banknameInput: HTMLInputElement;
  branchInput: HTMLInputElement;
  ifscInput: HTMLInputElement;
  acHolderNameInput: HTMLInputElement;
  aadharNoInput: HTMLInputElement;
  panNoInput: HTMLInputElement;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadKYCRequests();
    this.nameInput = document.getElementById("nameInput") as HTMLInputElement;
    this.useridInput = document.getElementById("useridInput") as HTMLInputElement;
    this.usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    this.phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
    this.emailInput = document.getElementById("emailInput") as HTMLInputElement;
    this.registeredonInput = document.getElementById("joindateInput") as HTMLInputElement;
    this.sponsoridInput = document.getElementById("sponsorInput") as HTMLInputElement;
    this.bankAcNoInput = document.getElementById("bankAcInput") as HTMLInputElement;
    this.banknameInput = document.getElementById("banknameInput") as HTMLInputElement;
    this.branchInput = document.getElementById("branchInput") as HTMLInputElement;
    this.ifscInput = document.getElementById("ifscInput") as HTMLInputElement;
    this.acHolderNameInput = document.getElementById("holderInput") as HTMLInputElement;
    this.aadharNoInput = document.getElementById("aadharInput") as HTMLInputElement;
    this.panNoInput = document.getElementById("panInput") as HTMLInputElement;
  }

  loadKYCRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetPendingKYCRequests', null).subscribe(response => {
      this.requests = response.data;
    }, error => {
      console.error(error);
    });
  }

  showDetailedPopup(
    user_id: string,
    name: string,
    phone: string,
    email: string,
    sponsor: string,
    username: string,
    registered_on: string,
    bank_ac_holder_name: string,
    ifsc_code: string,
    bank_name: string,
    branch: string,
    ac_no: string,
    pan_no: string, 
    aadhar_no: string
    ) {

      $('.ui.modal.pending-kyc').modal({
        closable: false, 
      }).modal('show');
      this.nameInput.value = name;
      this.useridInput.value = user_id;
      this.usernameInput.value = username;
      this.phoneInput.value = phone;
      this.emailInput.value = email;
      this.registeredonInput.value = registered_on.split('T')[0];
      this.sponsoridInput.value = sponsor;
      this.bankAcNoInput.value = ac_no;
      this.banknameInput.value = bank_name;
      this.branchInput.value = branch;
      this.ifscInput.value = ifsc_code;
      this.acHolderNameInput.value = bank_ac_holder_name;
      this.aadharNoInput.value = aadhar_no;
      this.panNoInput.value = pan_no;
      this.selectedRequest = user_id;
      $('.ui.dimmer').addClass('inverted');
      $('.sidebar-wrapper').css({ 'filter': 'opacity(0.5)' })
      $('.logo.sidebar-top').css({ 'filter': 'opacity(0.5)' })
      $('.nav').css({ 'filter': 'opacity(0.5)', 'pointer-events': 'none' })
  }

  hidePopup() {
    this.selectedRequest = null;
    $('.ui.modal.pending-kyc').modal('hide');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(1)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(1)' })
    $('.nav').css({ 'filter': 'opacity(1)', 'pointer-events': 'auto' })
  }

  approveKYC() {
    var param = {
      "param": {
        "user_id": this.selectedRequest
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/ApproveKYC', param).subscribe(response => {
      alert(response.message);
      this.hidePopup();
      this.loadKYCRequests();
    }, error => {
      console.error(error);
      this.hidePopup();
    });
  }
}
