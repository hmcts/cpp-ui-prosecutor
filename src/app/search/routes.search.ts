import { Routes } from '@angular/router';
import { SearchContainer } from './search.container';
import { SearchResultsComponent } from './components/results/search-results.component';

export const routesSearch: Routes = [
  {
    path: 'search',
    data: {
      title: 'Search whatever'
    },
    component: SearchContainer
  },
  {
    path: 'results',
    data: {
      title: 'Results whatever'
    },
    component: SearchResultsComponent
  }
];
