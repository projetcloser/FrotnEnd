import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCachetComponent } from './index-cachet.component';

describe('IndexCachetComponent', () => {
  let component: IndexCachetComponent;
  let fixture: ComponentFixture<IndexCachetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCachetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCachetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
