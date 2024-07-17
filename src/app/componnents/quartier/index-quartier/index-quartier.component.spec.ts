import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexQuartierComponent } from './index-quartier.component';

describe('IndexQuartierComponent', () => {
  let component: IndexQuartierComponent;
  let fixture: ComponentFixture<IndexQuartierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexQuartierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexQuartierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
