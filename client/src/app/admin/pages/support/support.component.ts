import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'support-cmp',
    moduleId: module.id,
    templateUrl: 'support.component.html'
})

export class SupportComponent {
  selectedMenu = 'Pending Tickets';

  menuItems = [
    {
      name: 'Pending Tickets',
      active: 'active'
    },
    { name: 'History' },
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
