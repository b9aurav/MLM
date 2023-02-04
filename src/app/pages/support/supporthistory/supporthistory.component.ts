import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'SupportHistory',
  templateUrl: './supporthistory.component.html',
  styleUrls: ['./supporthistory.component.css']
})
export class SupporthistoryComponent implements OnInit {
  user: any;
  tickets: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    var param = {
      "param": {
        "user_id": this.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>('api/GetTickets', param).subscribe(response => {
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
      this.http.post<{ data: any, message: string }>('api/DeleteTicket', param).subscribe(response => {
        alert(response.message);
        this.loadTickets();
      }, error => {
        console.error(error);
        this.loadTickets();
      });
    }
  }
}
