import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'UsedPins',
  templateUrl: './usedpins.component.html',
  styleUrls: ['./usedpins.component.css']
})
export class UsedPinsComponent implements OnInit {
  pins: any[];

  usedPinSettings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      Pin: {
        title: 'Pin',
      },
      "Generated By": {
        title: 'Generated For',
      },
      "Used By": {
        title: 'Used By',
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

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getUsedPins();
    }
  }

  getUsedPins() {
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUsedPins', null).subscribe(response => {
      this.pins = response.data;
    }, error => {
      console.error(error);
    });
  }

}
