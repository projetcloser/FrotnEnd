import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCachetComponent } from './update-cachet.component';

describe('UpdateCachetComponent', () => {
  let component: UpdateCachetComponent;
  let fixture: ComponentFixture<UpdateCachetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCachetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCachetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
