import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'DepositFund',
  templateUrl: './depositfund.component.html',
  styleUrls: ['./depositfund.component.css']
})
export class DepositfundComponent implements OnInit {
  transactionNoInput: HTMLInputElement;
  
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.transactionNoInput = document.getElementById("transaction-no-input") as HTMLInputElement;
    }
  }

  depositRequest() {
    var param = {
      "param": {
        "transaction_no": this.transactionNoInput.value,
        "user_id": this.authService.userData.user_id
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
