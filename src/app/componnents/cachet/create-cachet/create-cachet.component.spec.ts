import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCachetComponent } from './create-cachet.component';

describe('CreateCachetComponent', () => {
  let component: CreateCachetComponent;
  let fixture: ComponentFixture<CreateCachetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCachetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCachetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
