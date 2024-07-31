import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexpersonnelComponent } from './indexpersonnel.component';

describe('IndexpersonnelComponent', () => {
  let component: IndexpersonnelComponent;
  let fixture: ComponentFixture<IndexpersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexpersonnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexpersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
