import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

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

  images: any[] = [];

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
        width: '30%'
      },
      "Phone No": {
        title: 'Phone No',
        filter: false,
      },
      Email: {
        title: 'E-Mail',
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
          instance.onClick.subscribe(() => {
            this.showDetailedPopup(
              instance.rowData["User ID"],
              instance.rowData.Name,
              instance.rowData["Phone No"],
              instance.rowData.Email,
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

    var param = {
      "param": {
        "user_id": this.selectedRequest
      }
    }
    this.http.post<{ data: any, files: any }>(environment.apiBaseUrl + '/api/GetKYCDocuments', param).subscribe(response => {
      const fileExtensionsToMimeTypes = {
        'jpg': 'image/jpg',
        'png': 'image/png',
        'jpeg': 'image/jpeg'
      };
      response.files.forEach(fileContent => {
        const fileMimeType = fileExtensionsToMimeTypes[fileContent.document.split('.')[1]];
        const blob = new Blob([new Uint8Array(fileContent.file.data)], { type: fileMimeType });
        const reader = new FileReader();
        reader.onload = (event) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(blob);
      });
    }, error => {
      console.error(error);
      this.hidePopup();
    });
  }

  hidePopup() {
    this.selectedRequest = null;
    $('.ui.modal.pending-kyc').modal('hide');
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
