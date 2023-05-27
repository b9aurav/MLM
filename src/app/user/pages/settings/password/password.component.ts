import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'Password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  user: any;
  oldPasswordInput: HTMLInputElement;
  newPasswordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;

  constructor(private userService: UserService, private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.oldPasswordInput = document.getElementById('oldPassword') as HTMLInputElement
    this.newPasswordInput = document.getElementById('newPassword') as HTMLInputElement
    this.confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement
  }

  changePassword() {
    if (this.newPasswordInput.value == this.confirmPasswordInput.value) {
      var params = {
        "param": {
            "username": this.user.username,
            "OldPassword": this.oldPasswordInput.value,
            "NewPassword": this.newPasswordInput.value
        }
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/ChangeUserPassword', params).subscribe(response => {
        alert(response.message)
        if (response.message == 'Info  : Password Changed.') {
          this.oldPasswordInput.value = ""
          this.newPasswordInput.value = ""
          this.confirmPasswordInput.value = ""
        }
      }, error => {
        console.error(error);
      });
    } else {
      alert('Error : New password does not match with re-entered password!')
    }
  }
}
