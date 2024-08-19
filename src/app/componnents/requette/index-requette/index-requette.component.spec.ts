import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRequetteComponent } from './index-requette.component';

describe('IndexRequetteComponent', () => {
  let component: IndexRequetteComponent;
  let fixture: ComponentFixture<IndexRequetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexRequetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexRequetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
