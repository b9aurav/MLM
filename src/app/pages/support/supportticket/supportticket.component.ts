import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'SupportTicket',
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {
  user: any;
  subjectInput: HTMLInputElement;
  descriptionInput: HTMLTextAreaElement;

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void { 
    this.subjectInput = document.getElementById("subjectInput") as HTMLInputElement;
    this.descriptionInput = document.getElementById("descriptionTextarea") as HTMLTextAreaElement;
  }

  addTicket() {
    var param = {
      "param": {
        "subject": this.subjectInput.value,
        "description": this.descriptionInput.value,
        "user_id": this.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>('api/AddTicket', param).subscribe(response => {
      alert(response.message);
      document.getElementsByTagName('form')[0].reset();
    }, error => {
      console.error(error);
      document.getElementsByTagName('form')[0].reset();
    });
  }
}
