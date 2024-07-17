import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEntrepriseComponent } from './index-entreprise.component';

describe('IndexEntrepriseComponent', () => {
  let component: IndexEntrepriseComponent;
  let fixture: ComponentFixture<IndexEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
