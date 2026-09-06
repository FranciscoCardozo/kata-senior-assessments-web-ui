import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnalyzeCodeComponent } from './pages/analyze-code/analyze-code.component';
import { ResultsComponent } from './pages/results/results.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'analyze',
    component: AnalyzeCodeComponent
  },
  {
    path: 'validate',
    component: ResultsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
