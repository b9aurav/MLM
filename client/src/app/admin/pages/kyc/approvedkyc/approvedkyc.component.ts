import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
    selector: 'ApprovedKYC',
    templateUrl: './approvedkyc.component.html',
    styleUrls: ['./approvedkyc.component.css']
})

export class ApprovedkycComponent {
  requests: any[];
  selectedRequest: string;
  nameInput: HTMLInputElement;
  useridInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  approvedOnInput: HTMLInputElement;
  registeredonInput: HTMLInputElement;
  sponsoridInput: HTMLInputElement;
  bankAcNoInput: HTMLInputElement;
  banknameInput: HTMLInputElement;
  branchInput: HTMLInputElement;
  ifscInput: HTMLInputElement;
  acHolderNameInput: HTMLInputElement;
  aadharNoInput: HTMLInputElement;
  panNoInput: HTMLInputElement;

  requestSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "User ID": {
        title: 'User ID',
        width: '80px'
      },
      Name: {
        title: 'Name',
        width: '30%'
      },
      Username: {
        title: 'Username',
      },
      "Phone No": {
        title: 'Phone No',
      },
      Email: {
        title: 'E-Mail',
      },
      "Approved On": {
        title: 'Approved On',
      },
      action: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'View';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => {
            this.showDetailedPopup(
              instance.rowData["User ID"],
              instance.rowData.Name,
              instance.rowData["Phone No"],
              instance.rowData.Email,
              instance.rowData["Approved On"],
              instance.rowData.Sponsor,
              instance.rowData.Username,
              instance.rowData["Registered On"],
              instance.rowData.bank_ac_holder_name,
              instance.rowData.ifsc_code,
              instance.rowData.bank_name,
              instance.rowData.branch,
              instance.rowData.ac_no,
              instance.rowData.pan_no,
              instance.rowData.aadhar_no,
            );
          })
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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadKYCRequests();
      this.nameInput = document.getElementById("approvednameInput") as HTMLInputElement;
      this.useridInput = document.getElementById("approveduseridInput") as HTMLInputElement;
      this.usernameInput = document.getElementById("approvedusernameInput") as HTMLInputElement;
      this.phoneInput = document.getElementById("approvedphoneInput") as HTMLInputElement;
      this.emailInput = document.getElementById("approvedemailInput") as HTMLInputElement;
      this.approvedOnInput = document.getElementById("approvedOnInput") as HTMLInputElement;
      this.registeredonInput = document.getElementById("approvedjoindateInput") as HTMLInputElement;
      this.sponsoridInput = document.getElementById("approvedsponsorInput") as HTMLInputElement;
      this.bankAcNoInput = document.getElementById("approvedbankAcInput") as HTMLInputElement;
      this.banknameInput = document.getElementById("approvedbanknameInput") as HTMLInputElement;
      this.branchInput = document.getElementById("approvedbranchInput") as HTMLInputElement;
      this.ifscInput = document.getElementById("approvedifscInput") as HTMLInputElement;
      this.acHolderNameInput = document.getElementById("approvedholderInput") as HTMLInputElement;
      this.aadharNoInput = document.getElementById("approvedaadharInput") as HTMLInputElement;
      this.panNoInput = document.getElementById("approvedpanInput") as HTMLInputElement;
    }
  }

  loadKYCRequests() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetApprovedKYCRequests', null).subscribe(response => {
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
    approved_on: string,
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

      $('.ui.modal.approved-kyc').modal({
        closable: false, 
      }).modal('show');
      this.selectedRequest = user_id;
      this.nameInput.value = name;
      this.useridInput.value = user_id;
      this.usernameInput.value = username;
      this.phoneInput.value = phone;
      this.emailInput.value = email;
      this.approvedOnInput.value = approved_on;
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
  }

  hidePopup() {
    this.selectedRequest = null;
    $('.ui.modal.approved-kyc').modal('hide');
  }

  deactivateKYC() {
    var param = {
      "param": {
        "user_id": this.selectedRequest
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/RevokeKYC', param).subscribe(response => {
      alert(response.message);
      this.hidePopup();
      this.loadKYCRequests();
    }, error => {
      console.error(error);
      this.hidePopup();
    });
  }
}
