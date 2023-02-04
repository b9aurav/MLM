import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'PayoutHistory',
  templateUrl: './payouthistory.component.html',
  styleUrls: ['./payouthistory.component.css']
})
export class PayouthistoryComponent implements OnInit {
  user: any;
  transactions: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    var param = {
      "param": {
        "user_id": this.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>('api/GetWithdrawRequests', param).subscribe(response => {
      this.transactions = response.data;
    }, error => {
      console.error(error);
    });
  }

  showDeletePopup(request_id) {
    let result = confirm("Are you sure want to delete this request?");
    if (result) {
      var param = {
        "param": {
          "request_id": request_id
        } 
      }
      this.http.post<{ data: any, message: string }>('api/DeleteWithdrawRequest', param).subscribe(response => {
        alert(response.message);
        this.loadTransactions();
      }, error => {
        console.error(error);
        this.loadTransactions();
      });
    }
  }
}
