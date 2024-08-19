import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayeComponent } from './create-paye.component';

describe('CreatePayeComponent', () => {
  let component: CreatePayeComponent;
  let fixture: ComponentFixture<CreatePayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePayeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
