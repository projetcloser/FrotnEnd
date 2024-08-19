import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttestPersonnelComponent } from './create-attest-personnel.component';

describe('CreateAttestPersonnelComponent', () => {
  let component: CreateAttestPersonnelComponent;
  let fixture: ComponentFixture<CreateAttestPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAttestPersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAttestPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
