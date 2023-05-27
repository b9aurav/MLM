import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'PayoutWithdraw',
  templateUrl: './payoutwithdraw.component.html',
  styleUrls: ['./payoutwithdraw.component.css']
})
export class PayoutwithdrawComponent implements OnInit {
  user: any;
  available_bal: HTMLParagraphElement;
  amountInput: HTMLInputElement;

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void { 
    this.available_bal = document.getElementById("avail_bal") as HTMLParagraphElement;
    this.amountInput = document.getElementById("amount-input") as HTMLInputElement;

    this.available_bal.innerText = `Rs. ${this.user.available_balance}`
  }

  addWithdrawRequest() {
    var param = {
      "param": {
        "payout": this.amountInput.value,
        "remarks": "",
        "user_id": this.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/WithdrawRequest', param).subscribe(response => {
      alert(response.message);
      document.getElementsByTagName('form')[0].reset();
    }, error => {
      console.error(error);
      document.getElementsByTagName('form')[0].reset();
    });
  }
}
