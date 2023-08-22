import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'AchievementEdNTour',
  templateUrl: './achievementedntour.component.html',
  styleUrls: ['./achievementedntour.component.css']
})
export class AchievementedntourComponent implements OnInit {
  rows: any[];
  selectedAchievement: any = null;

  achievementInput: HTMLInputElement;
  achievementDatetimeInput: HTMLInputElement;
  useridInput: HTMLInputElement;
  rewardDatetimeInput: HTMLInputElement;
  remarksTextarea: HTMLTextAreaElement;
  submitButton: HTMLButtonElement;

  settings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      user_id: {
        title: 'User ID'
      },
      username: {
        title: 'Username'
      },
      achievement: {
        title: 'Achievement'
      },
      rank: {
        title: 'Rank'
      },
      achievement_datetime: {
        title: 'Achieved On'
      },
      rewarded: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell) => {
          return cell ? 'Rewarded' : 'Not Rewarded';
        }
      },
      reward_datetime: {
        title: 'Rewarded On'
      },
      action: {
        title: 'Actions',
        filter: false,
        type: 'custom',
        width: '80px',
        renderComponent: TableButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonText = 'View';
          instance.rowData = instance.row;
          instance.hidable = false;
          instance.onClick.subscribe(() => {
            this.showPopup(
              instance.rowData.achievement_id,
              instance.rowData.user_id,
              instance.rowData.achievement,
              instance.rowData.rewarded,
              instance.rowData.achievement_datetime,
              instance.rowData.reward_datetime,
              instance.rowData.remarks
            );
          });
        },
      }
    },
    pager: {
      perPage: 15,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    editable: false,
  };

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.achievementInput = document.getElementById('edntour-achievementInput') as HTMLInputElement;
      this.achievementDatetimeInput = document.getElementById('edntour-achievementDatetimeInput') as HTMLInputElement;
      this.useridInput = document.getElementById('edntour-useridInput') as HTMLInputElement;
      this.rewardDatetimeInput = document.getElementById('edntour-rewardDatetimeInput') as HTMLInputElement;
      this.remarksTextarea = document.getElementById('edntour-remarksTextarea') as HTMLTextAreaElement;
      this.submitButton = document.getElementById('edntour-submit-button') as HTMLButtonElement;
      this.getAutopoolAchievements();
    }
  }

  getAutopoolAchievements() {
    var param = {
      "param": {
        "achievementType": 'Education & Tour'
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetAchievements', param).subscribe(response => {
      this.rows = response.data
    }, error => {
      console.error(error);
    });
  }

  showPopup(
    achievement_id: any,
    user_id: any,
    achievement: any,
    rewarded: any,
    achievement_datetime: any,
    reward_datetime: any,
    remarks: any
  ) {

    $('.ui.modal.edntour-achievements').modal({
      closable: false,
    }).modal('show');
    this.selectedAchievement = achievement_id;
    this.achievementInput.value = achievement;
    this.achievementDatetimeInput.value = achievement_datetime;
    this.useridInput.value = user_id;
    this.rewardDatetimeInput.value = reward_datetime;
    this.remarksTextarea.value = remarks;
    if (rewarded == 1) {
      this.remarksTextarea.setAttribute('disabled', 'disabled');
      this.submitButton.setAttribute('disabled', 'disabled');
    }
  }

  hidePopup() {
    this.selectedAchievement = null;
    $('.ui.modal.edntour-achievements').modal('hide');
  }

  updateAchievement() {
    var param = {
      "param": {
        "achievementId": this.selectedAchievement,
        "remarks": this.remarksTextarea.value
      }
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/MarkAsRewardedAchievement', param).subscribe(response => {
      this.rows = response.data;
      alert(response.message);
      this.getAutopoolAchievements();
      this.hidePopup();
    }, error => {
      console.error(error);
    });
  }
}
