import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarninggiftrewardsComponent } from './earninggiftrewards.component';

describe('EarninggiftrewardsComponent', () => {
  let component: EarninggiftrewardsComponent;
  let fixture: ComponentFixture<EarninggiftrewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarninggiftrewardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarninggiftrewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
