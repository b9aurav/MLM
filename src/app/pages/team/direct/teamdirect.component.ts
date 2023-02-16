import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'TeamDirect',
  templateUrl: './teamdirect.component.html',
  styleUrls: ['./teamdirect.component.css']
})
export class TeamDirectComponent implements OnInit {
  user: any;
  members: any[];

  constructor(private userService: UserService,  private http: HttpClient) { 
    this.user = this.userService.user
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getDirectTeam();
    }, 100);
  }

  getDirectTeam() {
    var param = {
      "param": {
        "user_id": this.userService.user.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>('api/GetDirectTeam', param).subscribe(response => {
      this.members = response.data;
    }, error => {
      console.error(error);
    });
  }

}
