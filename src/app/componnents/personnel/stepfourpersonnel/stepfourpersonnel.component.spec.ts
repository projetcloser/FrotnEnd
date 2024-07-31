import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepfourpersonnelComponent } from './stepfourpersonnel.component';

describe('StepfourpersonnelComponent', () => {
  let component: StepfourpersonnelComponent;
  let fixture: ComponentFixture<StepfourpersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepfourpersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepfourpersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
