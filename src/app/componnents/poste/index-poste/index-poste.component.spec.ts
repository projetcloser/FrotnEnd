import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPosteComponent } from './index-poste.component';

describe('IndexPosteComponent', () => {
  let component: IndexPosteComponent;
  let fixture: ComponentFixture<IndexPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPosteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
