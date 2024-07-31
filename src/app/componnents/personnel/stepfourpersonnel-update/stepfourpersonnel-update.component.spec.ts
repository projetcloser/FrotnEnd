import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepfourpersonnelUpdateComponent } from './stepfourpersonnel-update.component';

describe('StepfourpersonnelUpdateComponent', () => {
  let component: StepfourpersonnelUpdateComponent;
  let fixture: ComponentFixture<StepfourpersonnelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepfourpersonnelUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepfourpersonnelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
