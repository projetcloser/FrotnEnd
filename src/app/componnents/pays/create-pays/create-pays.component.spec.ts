import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaysComponent } from './create-pays.component';

describe('CreatePaysComponent', () => {
  let component: CreatePaysComponent;
  let fixture: ComponentFixture<CreatePaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
