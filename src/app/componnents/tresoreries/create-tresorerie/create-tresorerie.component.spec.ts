import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTresorerieComponent } from './create-tresorerie.component';

describe('CreateTresorerieComponent', () => {
  let component: CreateTresorerieComponent;
  let fixture: ComponentFixture<CreateTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTresorerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
