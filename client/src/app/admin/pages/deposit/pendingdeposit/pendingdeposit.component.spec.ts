import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingdepositComponent } from './pendingdeposit.component';

describe('PayoutwithdrawComponent', () => {
  let component: PendingdepositComponent;
  let fixture: ComponentFixture<PendingdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingdepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
