import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCotisationComponent } from './index-cotisation.component';

describe('IndexCotisationComponent', () => {
  let component: IndexCotisationComponent;
  let fixture: ComponentFixture<IndexCotisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCotisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
