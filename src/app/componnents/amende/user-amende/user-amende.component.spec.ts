import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAmendeComponent } from './user-amende.component';

describe('UserAmendeComponent', () => {
  let component: UserAmendeComponent;
  let fixture: ComponentFixture<UserAmendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAmendeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
