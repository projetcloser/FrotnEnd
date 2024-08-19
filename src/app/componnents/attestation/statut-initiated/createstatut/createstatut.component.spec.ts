import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestatutComponent } from './createstatut.component';

describe('CreatestatutComponent', () => {
  let component: CreatestatutComponent;
  let fixture: ComponentFixture<CreatestatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatestatutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatestatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
