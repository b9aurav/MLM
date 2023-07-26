import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarninglevelComponent } from './earninglevel.component';

describe('EarninglevelComponent', () => {
  let component: EarninglevelComponent;
  let fixture: ComponentFixture<EarninglevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarninglevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarninglevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
