import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTresorerieComponent } from './update-tresorerie.component';

describe('UpdateTresorerieComponent', () => {
  let component: UpdateTresorerieComponent;
  let fixture: ComponentFixture<UpdateTresorerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTresorerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
