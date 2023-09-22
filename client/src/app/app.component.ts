import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  async ngOnInit() {
    let url = window.location.href;
    let tail = url.split('#')[1];
    if (tail == undefined || !tail.startsWith('/registration')) {
      if (await this.authService.isAuthenticated()) {
        if (this.authService.isUserAdmin()) {
          this.router.navigate(['/admin-dashboard']);
          return;
        } else {
          var param = {
            "param": {
              "type": 'user_popup'
            }
          }
          this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetGeneralSettings', param).subscribe(response => {
            console.log(response)
            if (response.data[0].status) {
              document.getElementById('message').textContent = response.data[0].message
              $('.ui.modal').modal('show');
            }
          }, error => {
            console.error(error);
          });
          this.router.navigate(['/dashboard']);
          return;
        }
      } else {
        this.router.navigate(['/login']);
        return;
      }
    } else if (window.location.href.split('#')[1].startsWith('/registration')) {
      return;
    }
  }

  closePopup() {
    $('.ui.modal').modal('hide');
  }
}
