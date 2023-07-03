import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'EarningAutopool',
  templateUrl: './Earningautopool.component.html',
  styleUrls: ['./Earningautopool.component.css']
})
export class EarningautopoolComponent implements OnInit {
  user: any;
  rows: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAutopoolEarnings();
    }, 100);
  }

  getAutopoolEarnings() {
    var param = {
      "param": {
        "user_id": this.userService.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetAutopoolIncome', param).subscribe(response => {
      this.rows = response.data
    }, error => {
      console.error(error);
    });
  }

}
