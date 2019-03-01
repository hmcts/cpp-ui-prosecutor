import { NgModule } from '@angular/core';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponent } from './dashboard.component';
import { PdkCoreModule } from '@cpp/pdk';
import { RouterModule } from '@angular/router';
import { SearchInputModule } from '../search/components/search/search-input.module';

const DECLARATIONS = [DashboardContainer, DashboardComponent];

@NgModule({
  imports: [PdkCoreModule, RouterModule, SearchInputModule],
  declarations: [...DECLARATIONS]
})
export class DashboardModule {}
