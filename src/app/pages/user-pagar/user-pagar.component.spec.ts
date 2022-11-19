import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPagarComponent } from './user-pagar.component';

describe('UserPagarComponent', () => {
  let component: UserPagarComponent;
  let fixture: ComponentFixture<UserPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPagarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
