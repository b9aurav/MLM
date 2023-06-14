import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'EarningLevel',
  templateUrl: './Earninglevel.component.html',
  styleUrls: ['./Earninglevel.component.css']
})
export class EarninglevelComponent implements OnInit {
  user: any;
  rows: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getLevelEarnings();
    }, 100);
  }

  getLevelEarnings() {
    var param = {
      "param": {
        "user_id": this.userService.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetIncomeByLevel', param).subscribe(response => {
      this.rows = response.data
    }, error => {
      console.error(error);
    });
  }

}
