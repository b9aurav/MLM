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
  isKYCActive: boolean;

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
      this.isKYCActive = response.data[0].is_active;
      let nameInput = document.getElementById("userdetails-nameInput") as HTMLInputElement;
      nameInput.value = this.userInfo[0].name
      let usernameInput = document.getElementById("userdetails-usernameInput") as HTMLInputElement;
      usernameInput.value = this.userInfo[0].username
      let useridInput = document.getElementById("userdetails-useridInput") as HTMLInputElement;
      useridInput.value = this.userInfo[0].user_id
      let sponsorInput = document.getElementById("userdetails-sponsorInput") as HTMLInputElement;
      sponsorInput.value = this.userInfo[0].sponsor_id
      let phoneInput = document.getElementById("userdetails-phoneInput") as HTMLInputElement;
      phoneInput.value = this.userInfo[0].phone
      let emailInput = document.getElementById("userdetails-emailInput") as HTMLInputElement;
      emailInput.value = this.userInfo[0].email
      let joindateInput = document.getElementById("userdetails-joindateInput") as HTMLInputElement;
      joindateInput.value = this.userInfo[0].join_date.split('T')[0]
      if (this.userInfo[0].activate_kyc) {
        let bankAcInput = document.getElementById("userdetails-bankAcInput") as HTMLInputElement;
        bankAcInput.value = this.userInfo[0].ac_no
        let banknameInput = document.getElementById("userdetails-banknameInput") as HTMLInputElement;
        banknameInput.value = this.userInfo[0].bank_name
        let branchInput = document.getElementById("userdetails-branchInput") as HTMLInputElement;
        branchInput.value = this.userInfo[0].branch
        let ifscInput = document.getElementById("userdetails-ifscInput") as HTMLInputElement;
        ifscInput.value = this.userInfo[0].ifsc_code
        let holderInput = document.getElementById("userdetails-holderInput") as HTMLInputElement;
        holderInput.value = this.userInfo[0].bank_ac_holder_name
        let aadharInput = document.getElementById("userdetails-aadharInput") as HTMLInputElement;
        aadharInput.value = this.userInfo[0].aadhar_no
        let panInput = document.getElementById("userdetails-panInput") as HTMLInputElement;
        panInput.value = this.userInfo[0].pan_no
      }
    }, error => {
      console.error(error);
    });
  }

  activateUser() {
    var param = {
      "param": {
        "user_id": this.selectedUser.getUser()
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/ActivateUser', param).subscribe(response => {
      alert(response.message);
      this.ngOnInit();
    }, error => {
      console.error(error);
    });
  }

  deactivateUser() {
    var param = {
      "param": {
        "user_id": this.selectedUser.getUser()
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DeactivateUser', param).subscribe(response => {
      alert(response.message);
      this.ngOnInit();
    }, error => {
      console.error(error);
    });
  }

}
