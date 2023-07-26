import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'EarningDirect',
  templateUrl: './earningdirect.component.html',
  styleUrls: ['./earningdirect.component.css']
})
export class EarningdirectComponent implements OnInit {
  @Input() user_id: number;
  members: any[];
  directEarningsText: HTMLParagraphElement;
  referralText: HTMLParagraphElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private selectedUser: UserService) { }

  ngOnInit(): void {
    console.log(this.user_id);
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      setTimeout(() => {
        this.getDirectEarnings();
      }, 100);
      this.directEarningsText = document.getElementById('directIncomeText') as HTMLParagraphElement;
      this.referralText = document.getElementById('directMembersText') as HTMLParagraphElement;
    }
  }

  getDirectEarnings() {
    var param = {
      "param": {
        "user_id": this.selectedUser.getUser()
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
