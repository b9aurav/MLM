import { Component } from '@angular/core';

@Component({
  selector: 'achievement-cmp',
  moduleId: module.id,
  templateUrl: 'achievement.component.html'
})

export class AchievementComponent {
  selectedMenu = 'Autopool';

  menuItems = [
    { 
      name: 'Autopool',
      active: 'active' 
    },
    { name: 'Education & Tour' },
    { name: 'Gifts & Rewards' }
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
