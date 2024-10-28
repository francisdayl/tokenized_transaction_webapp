import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenHttpComponent } from './token-http.component';

describe('TokenHttpComponent', () => {
  let component: TokenHttpComponent;
  let fixture: ComponentFixture<TokenHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenHttpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
