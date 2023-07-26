import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kyc-cmp',
    moduleId: module.id,
    templateUrl: 'kyc.component.html'
})

export class KYCComponent {
  selectedMenu = 'Pending KYC';

  menuItems = [
    {
      name: 'Pending KYC',
      active: 'active'
    },
    { name: 'Approved KYC' },
  ];

  changeMenu(menu) {
    this.selectedMenu = menu.name;
    document.querySelectorAll('.item').forEach((element) => {
      element.classList.remove('active');
    })
    document.getElementById(menu.name).classList.add('active');
  }
}
