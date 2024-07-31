import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTreepersonnelComponent } from './step-treepersonnel.component';

describe('StepTreepersonnelComponent', () => {
  let component: StepTreepersonnelComponent;
  let fixture: ComponentFixture<StepTreepersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTreepersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTreepersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
