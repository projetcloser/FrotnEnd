import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProfessionComponent } from './index-profession.component';

describe('IndexProfessionComponent', () => {
  let component: IndexProfessionComponent;
  let fixture: ComponentFixture<IndexProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexProfessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
