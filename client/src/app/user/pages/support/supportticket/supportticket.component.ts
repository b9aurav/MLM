import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'SupportTicket',
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit, AfterViewInit {
  subjectInput: HTMLInputElement;
  descriptionInput: HTMLTextAreaElement;
  imageFile: HTMLInputElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.subjectInput = document.getElementById("subjectInput") as HTMLInputElement;
      this.descriptionInput = document.getElementById("descriptionTextarea") as HTMLTextAreaElement;
      this.imageFile = document.getElementById("image-file") as HTMLInputElement
    }
  }

  ngAfterViewInit(): void {
    $('input[type="file"]').on('change', function () {
      const inputElement = this as HTMLInputElement;
      if (typeof inputElement.files[0] !== 'undefined') {
        const maxSize = parseInt($(inputElement).attr('data-max-size'), 10);
        const size = inputElement.files[0].size;
        const isOk = maxSize > size;
        if (!isOk) {
          alert('Error : File size should be less than 500 kb!')
        } else {
          var fileName = ($(this).val() as string).split("\\").pop();
          $(this).prev('input[type="text"]').val(fileName);
        }
      }
    });
  }

  addTicket() {
    try {
      const formData = new FormData();
      if (this.imageFile.files[0] != undefined) {
        formData.append("files", this.imageFile.files[0]);
      }
      var date = new Date();
      var param = {
        "subject": this.subjectInput.value,
        "description": this.descriptionInput.value,
        "user_id": this.authService.userData.user_id,
        "date_time": date.toLocaleString(),
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/AddTicket', formData, { params: param }).subscribe(response => {
        alert(response.message);
        document.getElementsByTagName('form')[0].reset();
      }, error => {
        console.error(error);
        document.getElementsByTagName('form')[0].reset();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
