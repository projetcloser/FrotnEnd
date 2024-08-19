import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttestPersonnelComponent } from './update-attest-personnel.component';

describe('UpdateAttestPersonnelComponent', () => {
  let component: UpdateAttestPersonnelComponent;
  let fixture: ComponentFixture<UpdateAttestPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAttestPersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAttestPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
