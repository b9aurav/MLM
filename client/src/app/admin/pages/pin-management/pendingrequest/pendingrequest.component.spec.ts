import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPinRequestComponent } from './pendingrequest.component';

describe('PayoutwithdrawComponent', () => {
  let component: PendingPinRequestComponent;
  let fixture: ComponentFixture<PendingPinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPinRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
