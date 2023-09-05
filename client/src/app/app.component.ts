import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    let url = window.location.href;
    let tail = url.split('#')[1];
    if (tail == undefined || !tail.startsWith('/registration')) {
      if (await this.authService.isAuthenticated()) {
        if (this.authService.isUserAdmin()) {
          this.router.navigate(['/admin-dashboard']);
          return;
        } else {
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
}
