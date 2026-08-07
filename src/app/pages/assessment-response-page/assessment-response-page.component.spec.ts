import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentResponsePageComponent } from './assessment-response-page.component';

describe('AssessmentResponsePageComponent', () => {
  let component: AssessmentResponsePageComponent;
  let fixture: ComponentFixture<AssessmentResponsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentResponsePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentResponsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
