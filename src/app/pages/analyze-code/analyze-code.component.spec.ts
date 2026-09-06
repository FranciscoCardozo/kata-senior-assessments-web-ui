import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AnalyzeCodeComponent } from './analyze-code.component';

describe('AnalyzeCodeComponent', () => {
  let component: AnalyzeCodeComponent;
  let fixture: ComponentFixture<AnalyzeCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeCodeComponent],
      providers: [provideRouter([]), provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
