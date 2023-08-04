import { Component } from '@angular/core';

@Component({
    selector: 'pin-cmp',
    moduleId: module.id,
    templateUrl: 'pin.component.html'
})

export class PinManagementComponent {
  selectedMenu = 'My Pins';

  menuItems = [
    {
      name: 'My Pins',
      active: 'active'
    },
    { name: 'Pin Request' },
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
