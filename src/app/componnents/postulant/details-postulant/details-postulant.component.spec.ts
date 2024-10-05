import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPostulantComponent } from './details-postulant.component';

describe('DetailsPostulantComponent', () => {
  let component: DetailsPostulantComponent;
  let fixture: ComponentFixture<DetailsPostulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPostulantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
