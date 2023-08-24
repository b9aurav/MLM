import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'PinRequest',
  templateUrl: './pinrequest.component.html',
  styleUrls: ['./pinrequest.component.css']
})
export class PinRequestComponent implements OnInit, AfterViewInit {
  transactionNoInput: HTMLInputElement;
  screenshotInput: HTMLInputElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.transactionNoInput = document.getElementById("transaction-no-input") as HTMLInputElement;
      this.screenshotInput = document.getElementById("payment-screenshot-file") as HTMLInputElement;
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

  depositRequest() {

    if (this.transactionNoInput.value == '') {
      alert('Error : Enter required details!');
      return;
    }

    try {
      const formData = new FormData();
      var filename = this.screenshotInput.files[0].name;
      var parts = filename.split('.');
      var fileExtension = parts[parts.length - 1].toLowerCase();
      formData.append("files", this.screenshotInput.files[0], this.transactionNoInput.value + '.' + fileExtension);

      var param = {
        "transaction_no": this.transactionNoInput.value,
        "user_id": this.authService.userData.user_id
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DepositRequest', formData, { params: param }).subscribe(response => {
        alert(response.message);
        document.getElementsByTagName('form')[0].reset();
      }, error => {
        console.error(error);
        document.getElementsByTagName('form')[0].reset();
      });
    } catch (error) {
      alert('Error : Payment screenshot is required!');
    }
  }
}
