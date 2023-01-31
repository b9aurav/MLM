import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { 
    console.log(this.userService.user)
  }

  ngOnInit(): void {
  }

}
