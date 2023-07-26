import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpayoutComponent } from './pendingpayout.component';

describe('PayoutwithdrawComponent', () => {
  let component: PendingpayoutComponent;
  let fixture: ComponentFixture<PendingpayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingpayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingpayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
