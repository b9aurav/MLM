import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'PendingTickets',
  templateUrl: './pendingtickets.component.html',
  styleUrls: ['./pendingtickets.component.css']
})
export class PendingticketsComponent implements OnInit {
  tickets: any[];
  selectedTicket: string;
  subjectInput: HTMLInputElement;
  descriptionInput: HTMLTextAreaElement;
  responseInput: HTMLTextAreaElement;

  images: any[] = [];

  requestSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "User ID": {
        title: 'User ID',
        width: '80px'
      },
      User: {
        title: 'Name',
        width: '30%'
      },
      Username: {
        title: 'Username',
        width: '30%',
      },      
      Subject: {
        title: 'Subject',
        width: '30%',
        type: 'html',
        valuePrepareFunction : (cell, row) => {
          return '<p class="truncate">' + cell + '</p>';
        }
      },
      Description: {
        title: 'Description',
        type: 'html',
        valuePrepareFunction : (cell, row) => {
          return '<p class="truncate">' + cell + '</p>';
        }
      },
      action: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'Respond';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => {
            this.respondTicketPopup(
              instance.rowData["Ticket No."],
              instance.rowData.Subject,
              instance.rowData.Description,
              instance.rowData["User ID"],
              instance.rowData["Date Time"]
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

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadTickets();
      this.descriptionInput = document.getElementById("descriptionTextarea") as HTMLTextAreaElement;
      this.subjectInput = document.getElementById("subjectInput") as HTMLInputElement;
      this.responseInput = document.getElementById("responseTextarea") as HTMLTextAreaElement;
    }
  }

  loadTickets() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetPendingTickets', null).subscribe(response => {
      this.tickets = response.data;
    }, error => {
      console.error(error);
    });
  }

  respondTicketPopup(ticket_no: string, subject: string, description: string, userid: string, datetime: string) {
    $('.ui.modal.pending').modal({
      closable: false, 
    }).modal('show');
    this.selectedTicket = ticket_no;
    this.descriptionInput.value = description;
    this.subjectInput.value = subject;

    var param = {
      "param": {
        "user_id": userid,
        "date_time": datetime,
      }
    }
    this.http.post<{ data: any, files: any }>(environment.apiBaseUrl + '/api/GetTicketImage', param).subscribe(response => {
      if (response.files.length !== 0) {
        document.getElementById('image-viewer').style.display = 'block'
        document.getElementById('form').classList.add('col-md-6');
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
      } else {
        document.getElementById('image-viewer').style.display = 'none'
        document.getElementById('form').classList.remove('col-md-6');
      }
    }, error => {
      console.error(error);
      this.hidePopup();
    });
  }

  hidePopup() {
    this.selectedTicket = null;
    $('.ui.modal.pending').modal('hide');
  }

  respondTicket() {
    var param = {
      "param": {
        "ticket_no": this.selectedTicket,
        "response": this.responseInput.value,
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/RespondTicket', param).subscribe(response => {
      alert(response.message);
      this.hidePopup();
      this.loadTickets();
    }, error => {
      console.error(error);
      this.hidePopup();
    });
  }
}
