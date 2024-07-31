import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCreateComponent } from './personnel-create.component';

describe('PersonnelCreateComponent', () => {
  let component: PersonnelCreateComponent;
  let fixture: ComponentFixture<PersonnelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
