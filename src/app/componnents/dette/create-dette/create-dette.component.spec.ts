import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDetteComponent } from './create-dette.component';

describe('CreateDetteComponent', () => {
  let component: CreateDetteComponent;
  let fixture: ComponentFixture<CreateDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
