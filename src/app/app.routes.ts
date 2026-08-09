import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AssessmentCreatePageComponent } from './pages/assessment-create-page/assessment-create-page.component';
import { AssessmentResponsePageComponent } from './pages/assessment-response-page/assessment-response-page.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { SummaryInfoComponent } from './pages/summary-info/summary-info.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'question/create',
    component: CreateQuestionComponent
  },
  {
    path: 'assessment/create',
    component: AssessmentCreatePageComponent
  },
  {
    path: 'assessment/response',
    component: AssessmentResponsePageComponent
  },
  {
    path: 'assessment/result',
    component: SummaryInfoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
