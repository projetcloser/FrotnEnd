import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstatutComponent } from './editstatut.component';

describe('EditstatutComponent', () => {
  let component: EditstatutComponent;
  let fixture: ComponentFixture<EditstatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditstatutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
