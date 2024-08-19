import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexstatutComponent } from './indexstatut.component';

describe('IndexstatutComponent', () => {
  let component: IndexstatutComponent;
  let fixture: ComponentFixture<IndexstatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexstatutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexstatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
