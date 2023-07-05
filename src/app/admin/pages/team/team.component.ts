import { Component } from '@angular/core';

@Component({
    selector: 'team-cmp',
    moduleId: module.id,
    templateUrl: 'team.component.html'
})

export class TeamComponent {
  selectedMenu = 'Autopool';

  menuItems = [
    {
      name: 'Autopool',
      active: 'active'
    }
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
