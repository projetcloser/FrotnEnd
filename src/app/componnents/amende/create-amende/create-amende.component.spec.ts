import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmendeComponent } from './create-amende.component';

describe('CreateAmendeComponent', () => {
  let component: CreateAmendeComponent;
  let fixture: ComponentFixture<CreateAmendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAmendeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
