import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostulantComponent } from './create-postulant.component';

describe('CreatePostulantComponent', () => {
  let component: CreatePostulantComponent;
  let fixture: ComponentFixture<CreatePostulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostulantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
