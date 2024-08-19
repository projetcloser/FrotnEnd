import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNonPayeComponent } from './index-non-paye.component';

describe('IndexNonPayeComponent', () => {
  let component: IndexNonPayeComponent;
  let fixture: ComponentFixture<IndexNonPayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexNonPayeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexNonPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
