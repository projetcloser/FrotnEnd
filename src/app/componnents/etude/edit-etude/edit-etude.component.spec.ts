import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtudeComponent } from './edit-etude.component';

describe('EditEtudeComponent', () => {
  let component: EditEtudeComponent;
  let fixture: ComponentFixture<EditEtudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEtudeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
