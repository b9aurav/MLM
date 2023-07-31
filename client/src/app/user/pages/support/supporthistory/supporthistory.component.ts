import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'SupportHistory',
  templateUrl: './supporthistory.component.html',
  styleUrls: ['./supporthistory.component.css']
})
export class SupporthistoryComponent implements OnInit {
  tickets: any[];

  ticketSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      "Ticket No.": {
        title: 'Request ID',
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
      Status: {
        title: 'Status',
        filter: false,
        width: '35%'
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
      this.loadTickets();
    }
  }

  loadTickets() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetTickets', param).subscribe(response => {
      this.tickets = response.data;
    }, error => {
      console.error(error);
    });
  }

  showDeletePopup(ticket_no) {
    let result = confirm("Are you sure want to delete this ticket?");
    if (result) {
      var param = {
        "param": {
          "ticket_no": ticket_no
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DeleteTicket', param).subscribe(response => {
        alert(response.message);
        this.loadTickets();
      }, error => {
        console.error(error);
        this.loadTickets();
      });
    }
  }
}
