import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'MyPins',
  templateUrl: './mypins.component.html',
  styleUrls: ['./mypins.component.css']
})
export class MyPinsComponent implements OnInit {
  pins: any[];

  pinSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      Pin: {
        title: 'Pin',
      },
      "Used By": {
        title: 'Used By',
        valuePrepareFunction: (cell) => {
          return cell == null ? '-- Unused --' : cell;
        },
      },
      "Generated On": {
        title: 'Generated On',
      },
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

  constructor(private authService: AuthService, private router: Router,  private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else { 
      this.getMyPins();
    }
  }

  getMyPins() {
    var param = {
      "param": {
        "user_id": this.authService.userData.user_id
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetPinsForUser', param).subscribe(response => {
      this.pins = response.data;
    }, error => {
      console.error(error);
    });
  }
}
