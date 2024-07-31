import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostulantComponent } from './edit-postulant.component';

describe('EditPostulantComponent', () => {
  let component: EditPostulantComponent;
  let fixture: ComponentFixture<EditPostulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPostulantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
