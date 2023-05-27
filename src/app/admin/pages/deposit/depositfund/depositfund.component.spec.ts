import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositfundComponent } from './depositfund.component';

describe('DepositfundComponent', () => {
  let component: DepositfundComponent;
  let fixture: ComponentFixture<DepositfundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositfundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
