import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPaysComponent } from './index-pays.component';

describe('IndexPaysComponent', () => {
  let component: IndexPaysComponent;
  let fixture: ComponentFixture<IndexPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
