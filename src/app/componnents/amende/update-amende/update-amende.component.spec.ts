import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAmendeComponent } from './update-amende.component';

describe('UpdateAmendeComponent', () => {
  let component: UpdateAmendeComponent;
  let fixture: ComponentFixture<UpdateAmendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAmendeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
