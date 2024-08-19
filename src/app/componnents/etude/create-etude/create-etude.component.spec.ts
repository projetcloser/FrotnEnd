import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtudeComponent } from './create-etude.component';

describe('CreateEtudeComponent', () => {
  let component: CreateEtudeComponent;
  let fixture: ComponentFixture<CreateEtudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEtudeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
