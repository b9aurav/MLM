import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  setUser(user: any) {
     this.user = user;
  }
  constructor() {
    this.user = {
      name: 'John Doe',
      email: 'johndoe@example.com'
    };
  }
}
