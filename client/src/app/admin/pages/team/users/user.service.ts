import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public user: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  
  getUser() {
    return this.user.value;
  }
}
