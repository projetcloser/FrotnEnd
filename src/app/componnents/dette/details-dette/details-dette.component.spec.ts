import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDetteComponent } from './details-dette.component';

describe('DetailsDetteComponent', () => {
  let component: DetailsDetteComponent;
  let fixture: ComponentFixture<DetailsDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
