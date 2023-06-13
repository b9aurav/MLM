import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'EarningDirect',
  templateUrl: './earningdirect.component.html',
  styleUrls: ['./earningdirect.component.css']
})
export class EarningdirectComponent implements OnInit {
  user: any;
  members: any[];
  directEarningsText: HTMLParagraphElement;
  referralText: HTMLParagraphElement;

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getDirectEarnings();
    }, 100);
    this.directEarningsText = document.getElementById('directIncomeText') as HTMLParagraphElement;
    this.referralText = document.getElementById('directMembersText') as HTMLParagraphElement;
  }

  getDirectEarnings() {
    var param = {
      "param": {
        "user_id": this.userService.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string, referrals: string, earnings: string }>(environment.apiBaseUrl + '/api/GetDirectEarnings', param).subscribe(response => {
      this.members = response.data;
      this.directEarningsText.textContent = 'Rs. ' + response.earnings;
      this.referralText.innerText = response.referrals;
    }, error => {
      console.error(error);
    });
  }

}
