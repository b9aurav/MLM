import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedPinsComponent } from './usedpins.component';

describe('UsedPinsComponent', () => {
  let component: UsedPinsComponent;
  let fixture: ComponentFixture<UsedPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedPinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsedPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
