import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEvenementComponent } from './index-evenement.component';

describe('IndexEvenementComponent', () => {
  let component: IndexEvenementComponent;
  let fixture: ComponentFixture<IndexEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
