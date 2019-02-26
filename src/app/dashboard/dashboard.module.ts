import { NgModule } from '@angular/core';
import { DashboardContainer } from './dashboard.container';
import { DashboardComponent } from './dashboard.component';
import { PdkCoreModule } from '@cpp/pdk';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../search/search.module';

const DECLARATIONS = [DashboardContainer, DashboardComponent];

@NgModule({
  imports: [PdkCoreModule, RouterModule, SearchModule],
  declarations: [...DECLARATIONS]
})
export class DashboardModule {}
