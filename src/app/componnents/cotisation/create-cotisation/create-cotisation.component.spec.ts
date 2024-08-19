import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCotisationComponent } from './create-cotisation.component';

describe('CreateCotisationComponent', () => {
  let component: CreateCotisationComponent;
  let fixture: ComponentFixture<CreateCotisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCotisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
