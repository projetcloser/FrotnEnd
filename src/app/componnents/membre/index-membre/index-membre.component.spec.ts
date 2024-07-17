import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMembreComponent } from './index-membre.component';

describe('IndexMembreComponent', () => {
  let component: IndexMembreComponent;
  let fixture: ComponentFixture<IndexMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexMembreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
