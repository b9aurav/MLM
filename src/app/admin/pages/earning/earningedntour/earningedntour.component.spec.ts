import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningedntourComponent } from './earningedntour.component';

describe('EarningedntourComponent', () => {
  let component: EarningedntourComponent;
  let fixture: ComponentFixture<EarningedntourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningedntourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningedntourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
