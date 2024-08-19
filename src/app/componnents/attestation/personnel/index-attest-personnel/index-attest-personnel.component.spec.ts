import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAttestPersonnelComponent } from './index-attest-personnel.component';

describe('IndexAttestPersonnelComponent', () => {
  let component: IndexAttestPersonnelComponent;
  let fixture: ComponentFixture<IndexAttestPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAttestPersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexAttestPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
