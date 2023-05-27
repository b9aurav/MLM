import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings-cmp',
  templateUrl: './settings.component.html',
  moduleId: module.id,
})

export class SettingsComponent {
  selectedMenu = 'Edit Profile';

  menuItems = [
    {
      name: 'Edit Profile',
      active: 'active'
    },
    { name: 'Change Password' },
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
  
}
