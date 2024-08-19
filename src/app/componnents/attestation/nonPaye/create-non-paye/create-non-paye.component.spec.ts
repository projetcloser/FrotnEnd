import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNonPayeComponent } from './create-non-paye.component';

describe('CreateNonPayeComponent', () => {
  let component: CreateNonPayeComponent;
  let fixture: ComponentFixture<CreateNonPayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNonPayeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNonPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
