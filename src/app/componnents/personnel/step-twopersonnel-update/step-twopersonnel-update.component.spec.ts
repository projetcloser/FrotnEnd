import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTwopersonnelUpdateComponent } from './step-twopersonnel-update.component';

describe('StepTwopersonnelUpdateComponent', () => {
  let component: StepTwopersonnelUpdateComponent;
  let fixture: ComponentFixture<StepTwopersonnelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTwopersonnelUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTwopersonnelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
