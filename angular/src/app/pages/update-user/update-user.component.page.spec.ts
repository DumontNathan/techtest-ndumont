import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserComponentPage } from './update-user.component.page';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponentPage;
  let fixture: ComponentFixture<UpdateUserComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserComponentPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUserComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
