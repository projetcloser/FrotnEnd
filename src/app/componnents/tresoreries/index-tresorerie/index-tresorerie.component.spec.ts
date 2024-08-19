import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTresorerieComponent } from './index-tresorerie.component';

describe('IndexTresorerieComponent', () => {
  let component: IndexTresorerieComponent;
  let fixture: ComponentFixture<IndexTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexTresorerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
