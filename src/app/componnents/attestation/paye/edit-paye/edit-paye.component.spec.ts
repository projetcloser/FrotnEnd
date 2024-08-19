import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayeComponent } from './edit-paye.component';

describe('EditPayeComponent', () => {
  let component: EditPayeComponent;
  let fixture: ComponentFixture<EditPayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPayeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
