import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCourses } from './current-courses';

describe('CurrentCourses', () => {
  let component: CurrentCourses;
  let fixture: ComponentFixture<CurrentCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
