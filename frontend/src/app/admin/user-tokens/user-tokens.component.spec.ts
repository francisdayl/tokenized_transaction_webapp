import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokensComponent } from './user-tokens.component';

describe('UserTokensComponent', () => {
  let component: UserTokensComponent;
  let fixture: ComponentFixture<UserTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTokensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
