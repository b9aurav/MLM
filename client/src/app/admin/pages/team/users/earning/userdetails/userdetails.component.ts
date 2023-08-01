import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'UserDetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserDetails implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private selectedUser: UserService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      setTimeout(() => {
        this.getUserDetails();
      }, 100);
    }
  }

  getUserDetails() {
    var param = {
      "param": {
        "user_id": this.selectedUser.getUser()
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsForAdmin', param).subscribe(response => {
      this.userInfo = response.data
      let userLabel = document.getElementById("userLabel") as HTMLLabelElement;
      userLabel.innerText = this.userInfo[0].name
      let nameInput = document.getElementById("nameInput") as HTMLInputElement;
      nameInput.value = this.userInfo[0].name
      let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
      usernameInput.value = this.userInfo[0].username
      let useridInput = document.getElementById("useridInput") as HTMLInputElement;
      useridInput.value = this.userInfo[0].user_id
      let sponsorInput = document.getElementById("sponsorInput") as HTMLInputElement;
      sponsorInput.value = this.userInfo[0].sponsor_id
      let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
      phoneInput.value = this.userInfo[0].phone
      let emailInput = document.getElementById("emailInput") as HTMLInputElement;
      emailInput.value = this.userInfo[0].email
      // let activeInput = document.getElementById("activeInput") as HTMLInputElement;
      let joindateInput = document.getElementById("joindateInput") as HTMLInputElement;
      joindateInput.value = this.userInfo[0].join_date.split('T')[0]
      let bankAcInput = document.getElementById("bankAcInput") as HTMLInputElement;
      bankAcInput.value = this.userInfo[0].ac_no
      let banknameInput = document.getElementById("banknameInput") as HTMLInputElement;
      banknameInput.value = this.userInfo[0].bank_name
      let branchInput = document.getElementById("branchInput") as HTMLInputElement;
      branchInput.value = this.userInfo[0].branch
      let ifscInput = document.getElementById("ifscInput") as HTMLInputElement;
      ifscInput.value = this.userInfo[0].ifsc_code
      let holderInput = document.getElementById("holderInput") as HTMLInputElement;
      holderInput.value = this.userInfo[0].bank_ac_holder_name
      let aadharInput = document.getElementById("aadharInput") as HTMLInputElement;
      aadharInput.value = this.userInfo[0].aadhar_no
      let panInput = document.getElementById("panInput") as HTMLInputElement;
      panInput.value = this.userInfo[0].pan_no
      // if (this.userInfo[0].is_active) {
      //   activeInput.value = 'Active'
      //   let activedateInput = document.getElementById("activedateInput") as HTMLInputElement;
      //   activedateInput.value = this.userInfo[0].activation_date.split('T')[0]
      // } else {
      //   activeInput.value = 'In-Active'
      // }
    }, error => {
      console.error(error);
    });
  }

}
