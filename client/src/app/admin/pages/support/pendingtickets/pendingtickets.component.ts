import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

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

  respondTicketPopup(ticket_no: string, subject: string, description: string) {
    $('.ui.modal.pending').modal({
      closable: false, 
    }).modal('show');
    this.selectedTicket = ticket_no;
    this.descriptionInput.value = description;
    this.subjectInput.value = subject;
    $('.ui.dimmer').addClass('inverted');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(0.5)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(0.5)' })
    $('.nav').css({ 'filter': 'opacity(0.5)', 'pointer-events': 'none' })
  }

  hidePopup() {
    this.selectedTicket = null;
    $('.ui.modal.pending').modal('hide');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(1)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(1)' })
    $('.nav').css({ 'filter': 'opacity(1)', 'pointer-events': 'auto' })
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
