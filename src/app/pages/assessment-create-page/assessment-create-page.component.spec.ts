import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCreatePageComponent } from './assessment-create-page.component';

describe('AssessmentCreatePageComponent', () => {
  let component: AssessmentCreatePageComponent;
  let fixture: ComponentFixture<AssessmentCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
