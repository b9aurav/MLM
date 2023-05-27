import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutwithdrawComponent } from './payoutwithdraw.component';

describe('PayoutwithdrawComponent', () => {
  let component: PayoutwithdrawComponent;
  let fixture: ComponentFixture<PayoutwithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutwithdrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
