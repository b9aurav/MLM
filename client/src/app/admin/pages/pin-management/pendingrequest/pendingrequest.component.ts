import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'PendingRequest',
  templateUrl: './pendingrequest.component.html',
  styleUrls: ['./pendingrequest.component.css']
})
export class PendingPinRequestComponent implements OnInit {
  requests: any[];
  selectedRequest: string;
  statusModel: any;
  requestidInput: HTMLInputElement;
  datetimeInput: HTMLInputElement;
  useridInput: HTMLInputElement;
  usernameInput: HTMLInputElement;
  transactionNoInput: HTMLInputElement;
  statusDropdown: HTMLSelectElement;
  remarksTextArea: HTMLTextAreaElement;

  images: any[] = [];

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
        width: '30%'
      },
      "Transaction No.": {
        title: 'Transaction No',
        filter: false,
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
            instance.rowData["Transaction No."],
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

    var param = {
      "param": {
        "user_id": user_id,
        "transaction_no": transaction_no,
      }
    }
    this.http.post<{ data: any, files: any }>(environment.apiBaseUrl + '/api/GetTransactionImage', param).subscribe(response => {
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
          this.images = [];
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
    $('.ui.modal.pending-depositrequest').modal('hide');
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
