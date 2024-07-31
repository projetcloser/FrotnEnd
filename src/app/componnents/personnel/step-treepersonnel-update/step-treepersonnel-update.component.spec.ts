import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTreepersonnelUpdateComponent } from './step-treepersonnel-update.component';

describe('StepTreepersonnelUpdateComponent', () => {
  let component: StepTreepersonnelUpdateComponent;
  let fixture: ComponentFixture<StepTreepersonnelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTreepersonnelUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTreepersonnelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
