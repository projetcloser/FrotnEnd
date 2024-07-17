import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVilleComponent } from './index-ville.component';

describe('IndexVilleComponent', () => {
  let component: IndexVilleComponent;
  let fixture: ComponentFixture<IndexVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexVilleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
