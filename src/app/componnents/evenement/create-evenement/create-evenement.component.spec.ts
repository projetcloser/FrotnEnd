import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvenementComponent } from './create-evenement.component';

describe('CreateEvenementComponent', () => {
  let component: CreateEvenementComponent;
  let fixture: ComponentFixture<CreateEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
