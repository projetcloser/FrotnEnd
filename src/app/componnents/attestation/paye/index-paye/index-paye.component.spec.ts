import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPayeComponent } from './index-paye.component';

describe('IndexPayeComponent', () => {
  let component: IndexPayeComponent;
  let fixture: ComponentFixture<IndexPayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPayeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
