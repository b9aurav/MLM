import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRespondedTickets();
    this.descriptionInput = document.getElementById("historydescriptionTextarea") as HTMLTextAreaElement;
    this.subjectInput = document.getElementById("historysubjectInput") as HTMLTextAreaElement;
    this.responseInput = document.getElementById("historyresponseTextarea") as HTMLTextAreaElement;
  }

  loadRespondedTickets() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetRespondedTickets', null).subscribe(response => {
      this.tickets = response.data;
    }, error => {
      console.error(error);
    });
  }

  respondedTicketPopup(subject: string, description: string, response: string) {
    console.log(subject, description, response)
    $('.ui.modal.history').modal({
      closable: false, 
    }).modal('show');
    this.descriptionInput.value = description;
    this.subjectInput.value = subject;
    this.responseInput.value = response;
    $('.ui.dimmer').addClass('inverted');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(0.5)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(0.5)' })
    $('.nav').css({ 'filter': 'opacity(0.5)', 'pointer-events': 'none' })
  }

  hidePopup() {
    $('.ui.modal.history').modal('hide');
    $('.sidebar-wrapper').css({ 'filter': 'opacity(1)' })
    $('.logo.sidebar-top').css({ 'filter': 'opacity(1)' })
    $('.nav').css({ 'filter': 'opacity(1)', 'pointer-events': 'auto' })
  }
}
