import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'SupportHistory',
  templateUrl: './supporthistory.component.html',
  styleUrls: ['./supporthistory.component.css']
})
export class SupporthistoryComponent implements OnInit {
  tickets: any[];
  subjectInput: HTMLTextAreaElement
  descriptionInput: HTMLTextAreaElement;
  responseInput: HTMLTextAreaElement;

  requestSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "Ticket No.": {
        title: 'User ID',
        width: '80px'
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
          instance.buttonText = 'View';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => {
            this.respondedTicketPopup(
              instance.rowData.Subject,
              instance.rowData.Description,
              instance.rowData.Response
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

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.loadRespondedTickets();
      this.descriptionInput = document.getElementById("historydescriptionTextarea") as HTMLTextAreaElement;
      this.subjectInput = document.getElementById("historysubjectInput") as HTMLTextAreaElement;
      this.responseInput = document.getElementById("historyresponseTextarea") as HTMLTextAreaElement;
    }
  }

  loadRespondedTickets() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedTickets', null).subscribe(response => {
      this.tickets = response.data;
    }, error => {
      console.error(error);
    });
  }

  respondedTicketPopup(subject: string, description: string, response: string) {
    $('.ui.modal.history').modal({
      closable: false, 
    }).modal('show');
    this.descriptionInput.value = description;
    this.subjectInput.value = subject;
    this.responseInput.value = response;
  }

  hidePopup() {
    $('.ui.modal.history').modal('hide');
  }
}
