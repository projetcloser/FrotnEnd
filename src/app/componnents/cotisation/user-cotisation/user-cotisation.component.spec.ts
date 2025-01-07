import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCotisationComponent } from './user-cotisation.component';

describe('UserCotisationComponent', () => {
  let component: UserCotisationComponent;
  let fixture: ComponentFixture<UserCotisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCotisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
