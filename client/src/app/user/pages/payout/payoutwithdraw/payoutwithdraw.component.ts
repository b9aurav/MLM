import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'PayoutWithdraw',
  templateUrl: './payoutwithdraw.component.html',
  styleUrls: ['./payoutwithdraw.component.css']
})
export class PayoutwithdrawComponent implements OnInit {
  amountInput: HTMLInputElement;
  withdrawable: HTMLParagraphElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void { 
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.amountInput = document.getElementById("amount-input") as HTMLInputElement;
      this.withdrawable = document.getElementById('Withdrawable-bal') as HTMLParagraphElement;
      var param = {
        "param": {
          "user_id": this.authService.userData.user_id
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsForAdmin', param).subscribe(response => {
        this.withdrawable.textContent = `Rs. ${response.data[0].available_balance}`
      }, error => {
        console.error(error);
        document.getElementsByTagName('form')[0].reset();
      });
    }
  }

  addWithdrawRequest() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsForAdmin', param).subscribe(response => {
      if (response.data[0].activate_kyc) {
        var param = {
          "param": {
            "amount": this.amountInput.value,
            "user_id": this.authService.userData.user_id
          } 
        }
        this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/WithdrawRequest', param).subscribe(response => {
          alert(response.message);
          document.getElementsByTagName('form')[0].reset();
        }, error => {
          console.error(error);
          document.getElementsByTagName('form')[0].reset();
        });
      } else {
        alert('Error : KYC Required for withdraw!')
      }
    }, error => {
      console.error(error);
      document.getElementsByTagName('form')[0].reset();
    });
    
  }
}
