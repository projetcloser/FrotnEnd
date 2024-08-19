import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEtudeComponent } from './index-etude.component';

describe('IndexEtudeComponent', () => {
  let component: IndexEtudeComponent;
  let fixture: ComponentFixture<IndexEtudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEtudeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
