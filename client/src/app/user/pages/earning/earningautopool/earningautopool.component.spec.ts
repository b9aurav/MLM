import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningautopoolComponent } from './earningautopool.component';

describe('EarningautopullComponent', () => {
  let component: EarningautopoolComponent;
  let fixture: ComponentFixture<EarningautopoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarningautopoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningautopoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
