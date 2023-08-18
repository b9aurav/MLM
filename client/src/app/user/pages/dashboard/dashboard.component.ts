import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  availableBal: HTMLParagraphElement;
  directEarnings: HTMLParagraphElement;
  levelEarnings: HTMLParagraphElement;
  totalEarnings: HTMLParagraphElement;
  directMembers: HTMLParagraphElement;
  autopoolLevel: HTMLParagraphElement;
  giftRewardRank: HTMLParagraphElement;
  eduRank: HTMLParagraphElement;
  autopoolReward: HTMLParagraphElement;
  eduReward: HTMLParagraphElement;
  giftReward: HTMLParagraphElement;
  digitalToken: HTMLParagraphElement;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  
  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.availableBal = document.getElementById('available-bal') as HTMLParagraphElement;
      this.directEarnings = document.getElementById('direct-earnings') as HTMLParagraphElement;
      this.levelEarnings = document.getElementById('level-earnings') as HTMLParagraphElement;
      this.totalEarnings = document.getElementById('total-earnings') as HTMLParagraphElement;
      this.directMembers = document.getElementById('direct-members') as HTMLParagraphElement;
      this.autopoolLevel = document.getElementById('autopool-level') as HTMLParagraphElement;
      this.giftRewardRank = document.getElementById('gift-reward-rank') as HTMLParagraphElement;
      this.eduRank = document.getElementById('education-tour-rank') as HTMLParagraphElement;
      this.autopoolReward = document.getElementById('autopool-reward') as HTMLParagraphElement;
      this.eduReward = document.getElementById('education-reward') as HTMLParagraphElement;
      this.giftReward = document.getElementById('gift-reward') as HTMLParagraphElement;
      this.digitalToken = document.getElementById('digital-token') as HTMLParagraphElement;
      setTimeout(() => {
        this.getDashboardData();
      }, 100);
    }
  }

  getDashboardData() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, autopoolLevel: any, autopoolReward: any, availableBal: any, directEarnings: any, directMembers: any, eduRank: any, eduReward: any, giftReward: any, giftRewardRank: any, levelEarnings: any, digitalToken: any, message: string }>(environment.apiBaseUrl + '/api/GetDashboardData', param).subscribe(response => {
      response.availableBal != null ? this.availableBal.textContent = 'Rs. ' + response.availableBal : this.availableBal.textContent = '0'
      response.directEarnings != null ? this.directEarnings.textContent = 'Rs. ' + response.directEarnings : this.directEarnings.textContent = '0'
      response.levelEarnings != null ? this.levelEarnings.textContent = 'Rs. ' + response.levelEarnings : this.levelEarnings.textContent = '0'
      response.directMembers != null ? this.directMembers.textContent = response.directMembers : this.directMembers.textContent = '0'
      response.autopoolLevel != null ? this.autopoolLevel.textContent = response.autopoolLevel : this.autopoolLevel.textContent = '0'
      response.giftRewardRank != null ? this.giftRewardRank.textContent = response.giftRewardRank : this.giftRewardRank.textContent = 'N/A'
      response.eduRank != null ? this.eduRank.textContent = response.eduRank : this.eduRank.textContent = 'N/A'
      response.autopoolReward != null ? this.autopoolReward.textContent = response.autopoolReward : this.autopoolReward.textContent = 'N/A'
      response.eduReward != null ? this.eduReward.textContent = response.eduReward : this.eduReward.textContent = 'N/A'
      response.giftReward != null ? this.giftReward.textContent = response.giftReward : this.giftReward.textContent = 'N/A'
      response.digitalToken != null ? this.digitalToken.textContent = response.digitalToken + ' Points' : this.digitalToken.textContent = '0'
      this.totalEarnings.textContent = 'Rs. ' + (parseInt(response.directEarnings) + parseInt(response.levelEarnings)).toString()
    }, error => {
      console.error(error);
    });
  }
}
