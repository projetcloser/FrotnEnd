import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNonPayeComponent } from './edit-non-paye.component';

describe('EditNonPayeComponent', () => {
  let component: EditNonPayeComponent;
  let fixture: ComponentFixture<EditNonPayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNonPayeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNonPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
