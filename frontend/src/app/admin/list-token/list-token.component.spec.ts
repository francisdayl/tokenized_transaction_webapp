import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTokenComponent } from './list-token.component';

describe('ListTokenComponent', () => {
  let component: ListTokenComponent;
  let fixture: ComponentFixture<ListTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
