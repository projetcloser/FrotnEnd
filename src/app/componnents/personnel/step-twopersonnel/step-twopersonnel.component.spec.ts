import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwopersonnelComponent } from './step-twopersonnel.component';

describe('StepTwopersonnelComponent', () => {
  let component: StepTwopersonnelComponent;
  let fixture: ComponentFixture<StepTwopersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTwopersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTwopersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
