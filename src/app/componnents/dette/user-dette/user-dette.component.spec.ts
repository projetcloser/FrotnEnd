import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetteComponent } from './user-dette.component';

describe('UserDetteComponent', () => {
  let component: UserDetteComponent;
  let fixture: ComponentFixture<UserDetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
