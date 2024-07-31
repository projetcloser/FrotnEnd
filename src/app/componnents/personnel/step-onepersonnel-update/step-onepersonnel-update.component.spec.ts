import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOnepersonnelUpdateComponent } from './step-onepersonnel-update.component';

describe('StepOnepersonnelUpdateComponent', () => {
  let component: StepOnepersonnelUpdateComponent;
  let fixture: ComponentFixture<StepOnepersonnelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepOnepersonnelUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepOnepersonnelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
