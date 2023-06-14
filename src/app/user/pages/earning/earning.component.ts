import { Component } from '@angular/core';

@Component({
  selector: 'earning-cmp',
  moduleId: module.id,
  templateUrl: 'earning.component.html'
})

export class EarningComponent {
  selectedMenu = 'Direct';

  menuItems = [
    {
      name: 'Direct',
      active: 'active'
    },
    { name: 'Level' },
    { name: 'Autopool' },
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
