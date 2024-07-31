import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPostulantComponent } from './index-postulant.component';

describe('IndexPostulantComponent', () => {
  let component: IndexPostulantComponent;
  let fixture: ComponentFixture<IndexPostulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPostulantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
