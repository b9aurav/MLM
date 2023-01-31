import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAutopoolComponent } from './teamautopool.component';

describe('TeamAutopoolComponent', () => {
  let component: TeamAutopoolComponent;
  let fixture: ComponentFixture<TeamAutopoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAutopoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAutopoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
