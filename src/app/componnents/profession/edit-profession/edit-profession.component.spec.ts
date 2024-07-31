import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfessionComponent } from './edit-profession.component';

describe('EditProfessionComponent', () => {
  let component: EditProfessionComponent;
  let fixture: ComponentFixture<EditProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
