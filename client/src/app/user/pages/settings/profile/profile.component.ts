import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      var param = {
        "param": {
          "user_id": this.authService.userData.user_id
        }
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsForAdmin', param).subscribe(response => {
        let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
        userLabel.innerText = response.data[0].name
        let nameInput = document.getElementById("nameInput") as HTMLInputElement;
        nameInput.value = response.data[0].name
        let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
        usernameInput.value = response.data[0].username
        let useridInput = document.getElementById("useridInput") as HTMLInputElement;
        useridInput.value = response.data[0].user_id
        let sponsorInput = document.getElementById("sponsorInput") as HTMLInputElement;
        sponsorInput.value = response.data[0].sponsor_id
        let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
        phoneInput.value = response.data[0].phone
        let emailInput = document.getElementById("emailInput") as HTMLInputElement;
        emailInput.value = response.data[0].email
        let activeInput = document.getElementById("activeInput") as HTMLInputElement;
        let joindateInput = document.getElementById("joindateInput") as HTMLInputElement;
        joindateInput.value = response.data[0].join_date.split('T')[0]
        if (response.data[0].is_active) {
          activeInput.value = 'Active'
          let activedateInput = document.getElementById("activedateInput") as HTMLInputElement;
          activedateInput.value = response.data[0].activation_date.split('T')[0]
        } else {
          activeInput.value = 'In-Active'
        }
        if (response.data[0].activate_kyc) {
          let bankAcInput = document.getElementById("bankAcInput") as HTMLInputElement;
          bankAcInput.value = response.data[0].ac_no
          let banknameInput = document.getElementById("banknameInput") as HTMLInputElement;
          banknameInput.value = response.data[0].bank_name
          let branchInput = document.getElementById("branchInput") as HTMLInputElement;
          branchInput.value = response.data[0].branch
          let ifscInput = document.getElementById("ifscInput") as HTMLInputElement;
          ifscInput.value = response.data[0].ifsc_code
          let holderInput = document.getElementById("holderInput") as HTMLInputElement;
          holderInput.value = response.data[0].bank_ac_holder_name
          let aadharInput = document.getElementById("aadharInput") as HTMLInputElement;
          aadharInput.value = response.data[0].aadhar_no
          let panInput = document.getElementById("panInput") as HTMLInputElement;
          panInput.value = response.data[0].pan_no
        }
      }, error => console.error(error));
    }
  }
}
