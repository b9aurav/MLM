import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TableButtonComponent } from 'app/components/table-button/table-button.component';

@Component({
  selector: 'GeneratePins',
  templateUrl: './generatepins.component.html',
  styleUrls: ['./generatepins.component.css']
})
export class GeneratePinsComponent implements OnInit {
  member: any[];
  user_id: any;

  settings = {
    mode: 'external',
    selectedRowIndex: -1,
    columns: {
      user_id: {
        title: 'ID',
        width: '80px'
      },
      name: {
        title: 'Name'
      },
      username: {
        title: 'Username'
      },
      email: {
        title: 'E-Mail',
      },
      join_date: {
        title: 'Joining Date'
      },
      activation_date: {
        title: 'Activation Date'
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
    noDataMessage: 'No users available.',
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  getUserDetails() {
    var username = document.getElementById('username-input') as HTMLInputElement;
    var param = {
      "param": {
        "username": username.value
      } 
    }
    this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetails', param).subscribe(response => {
      if (response.data.length == 1) {
        this.user_id = response.data[0].user_id;
        var param = {
          "param": {
            "user_id": response.data[0].user_id
          } 
        }
        this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetailsByUserID', param).subscribe(response => {
          this.member = response.data;
          document.getElementById('generate-form').style.display = 'block'
        }, error => {
          console.error(error);
        });
      } else {
        alert('Error : User not found!')
      }
    }, error => {
      console.error(error);
    });
  }

  generatePins() {
    var qty = document.getElementById('qty-input') as HTMLInputElement;
    var pins = document.getElementById('pins') as HTMLTextAreaElement;
    if (qty.value !== '') {
      var param = {
        "param": {
          "user_id": this.user_id,
          "qty": qty.value
        } 
      }
      this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GeneratePins', param).subscribe(response => {
        for (var i = 0; i < parseInt(qty.value); i++) {
          if (i === 0) pins.value += response.data[i].pin;
          else pins.value += '\n' + response.data[i].pin;
        }
        pins.style.display = 'block'
        alert(response.message);
      }, error => {
        console.error(error);
      });
    } else {
      alert('Enter PIN Quantity!');
    }
  }
}
