import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePinsComponent } from './generatepins.component';

describe('PayoutwithdrawComponent', () => {
  let component: GeneratePinsComponent;
  let fixture: ComponentFixture<GeneratePinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
