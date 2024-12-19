import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageCreateComponent } from './singlepage-create.component';

describe('SinglepageCreateComponent', () => {
  let component: SinglepageCreateComponent;
  let fixture: ComponentFixture<SinglepageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglepageCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglepageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
