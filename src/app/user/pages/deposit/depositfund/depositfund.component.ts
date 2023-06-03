import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'DepositFund',
  templateUrl: './depositfund.component.html',
  styleUrls: ['./depositfund.component.css']
})
export class DepositfundComponent implements OnInit {
  user: any;
  transactionNoInput: HTMLInputElement;
  
  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.transactionNoInput = document.getElementById("transaction-no-input") as HTMLInputElement;
  }

  depositRequest() {
    var param = {
      "param": {
        "transaction_no": this.transactionNoInput.value,
        "user_id": this.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/DepositRequest', param).subscribe(response => {
      alert(response.message);
      document.getElementsByTagName('form')[0].reset();
    }, error => {
      console.error(error);
      document.getElementsByTagName('form')[0].reset();
    });
  }
}
