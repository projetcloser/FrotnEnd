import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOnepersonnelComponent } from './step-onepersonnel.component';

describe('StepOnepersonnelComponent', () => {
  let component: StepOnepersonnelComponent;
  let fixture: ComponentFixture<StepOnepersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOnepersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOnepersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
