import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAmendeComponent } from './details-amende.component';

describe('DetailsAmendeComponent', () => {
  let component: DetailsAmendeComponent;
  let fixture: ComponentFixture<DetailsAmendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAmendeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
