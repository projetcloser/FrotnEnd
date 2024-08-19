import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditperssonnelComponent } from './editperssonnel.component';

describe('EditperssonnelComponent', () => {
  let component: EditperssonnelComponent;
  let fixture: ComponentFixture<EditperssonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditperssonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditperssonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
