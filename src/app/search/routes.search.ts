import { Routes } from '@angular/router';
import { SearchContainer } from './components/search/search.container';
import { SearchResultsContainer } from './components/results/seach-results.container';

export const routesSearch: Routes = [
  {
    path: 'search',
    data: {
      title: 'Search for a case'
    },
    component: SearchContainer
  },
  {
    path: 'search/results',
    data: {
      title: 'Search for a case'
    },
    component: SearchResultsContainer
  }
];
