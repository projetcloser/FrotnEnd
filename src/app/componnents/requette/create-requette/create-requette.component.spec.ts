import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequetteComponent } from './create-requette.component';

describe('CreateRequetteComponent', () => {
  let component: CreateRequetteComponent;
  let fixture: ComponentFixture<CreateRequetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRequetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRequetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
