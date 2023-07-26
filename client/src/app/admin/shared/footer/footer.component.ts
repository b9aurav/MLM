import { Component, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class AdminFooterComponent{
    test : Date = new Date();
}
