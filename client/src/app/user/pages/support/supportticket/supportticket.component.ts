import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'SupportTicket',
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {
  subjectInput: HTMLInputElement;
  descriptionInput: HTMLTextAreaElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void { 
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.subjectInput = document.getElementById("subjectInput") as HTMLInputElement;
      this.descriptionInput = document.getElementById("descriptionTextarea") as HTMLTextAreaElement;
    }
  }

  addTicket() {
    var param = {
      "param": {
        "subject": this.subjectInput.value,
        "description": this.descriptionInput.value,
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/AddTicket', param).subscribe(response => {
      alert(response.message);
      document.getElementsByTagName('form')[0].reset();
    }, error => {
      console.error(error);
      document.getElementsByTagName('form')[0].reset();
    });
  }
}
