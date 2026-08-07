import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AssessmentCreatePageComponent } from './pages/assessment-create-page/assessment-create-page.component';
import { AssessmentResponsePageComponent } from './pages/assessment-response-page/assessment-response-page.component';


export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
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
    path: '**',
    redirectTo: ''
  }
];
