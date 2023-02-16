import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  hash: any;
  setUser(user: any) {
     this.user = user;
     if (user != '') {
      localStorage.setItem('mlm_user', user.username);
     } else {
      localStorage.removeItem('mlm_user');
     }
  }
}