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
  available_bal: HTMLParagraphElement;
  amountInput: HTMLInputElement;
  admin: HTMLParagraphElement;
  tds: HTMLParagraphElement;
  dt: HTMLParagraphElement;
  withdrawable: HTMLParagraphElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void { 
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.available_bal = document.getElementById("avail_bal") as HTMLParagraphElement;
      this.amountInput = document.getElementById("amount-input") as HTMLInputElement;
      this.admin = document.getElementById('admin-charge') as HTMLParagraphElement;
      this.tds = document.getElementById('tds-charge') as HTMLParagraphElement;
      this.dt = document.getElementById('dt-charge') as HTMLParagraphElement;
      this.withdrawable = document.getElementById('Withdrawable-bal') as HTMLParagraphElement;
      var param = {
        "param": {
          "user_id": this.authService.userData.user_id
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsForAdmin', param).subscribe(response => {
        console.log
        this.available_bal.innerText = `Available Balance: Rs. ${response.data[0].available_balance}`
        this.admin.textContent = `Admin Charge: Rs. ${response.data[0].available_balance * 10 / 100} (10%)`
        this.tds.textContent = `TDS Charge: Rs. ${response.data[0].available_balance * 5 / 100} (5%)`
        this.dt.textContent = `Digital Token Charge: Rs. ${response.data[0].available_balance * 10 / 100} (10%)`
        this.withdrawable.textContent = `Rs. ${response.data[0].available_balance * 75 / 100}`
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
