import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMembreComponent } from './create-membre.component';

describe('CreateMembreComponent', () => {
  let component: CreateMembreComponent;
  let fixture: ComponentFixture<CreateMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMembreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
