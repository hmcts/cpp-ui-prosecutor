import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualCaseCreateContainer } from './manual-case-create.container';
import { AlcoholLevelMethodsGuard } from '../core/guards/alcohol-level-methods';
import { PoliceForcesGuard } from '../core/guards/police-forces';
import { OffenceDateCodesGuard } from '../core/guards/offence-date-codes';
import { RemandStatusesGuard } from '../core/guards/remand-statuses';
import { HearingTypesGuard, OrganisationUnitsGuard, PleaTypesGuard, ProsecutorsGuard } from '@cpp/reference-data';
import { SummonsCodesGuard } from '../core/guards/summons-codes';
import { VerdictTypesGuard } from '../core/guards/verdict-types';
import { MotReasonsGuard } from '../core/guards/mot-reasons';
import { EthnicitiesGuard } from '../shared/guards/ethnicities.guard';
import { EthnicityCodesGuard } from '../shared/guards/ethnicity-codes.guard';
import { NationalitiesGuard } from '../shared/guards/nationalities.guard';
import { ProsecutorByCodeGuard } from '../shared/guards/prosecutorByCode.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [
      AlcoholLevelMethodsGuard,
      PoliceForcesGuard,
      OffenceDateCodesGuard,
      HearingTypesGuard,
      RemandStatusesGuard,
      ProsecutorsGuard,
      SummonsCodesGuard,
      PleaTypesGuard,
      VerdictTypesGuard,
      MotReasonsGuard,
      NationalitiesGuard,
      EthnicityCodesGuard,
      EthnicitiesGuard,
      ProsecutorByCodeGuard,
      OrganisationUnitsGuard
    ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'type' },
      {
        path: 'type',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Create a case or application | Common Platform'
        }
      },
      {
        path: 'edit-type',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Create a case or application | Common Platform'
        }
      },
      {
        path: 'case-detail',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Case details | Common Platform'
        }
      },
      {
        path: 'edit-case-detail',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Case details | Common Platform'
        }
      },
      {
        path: 'prosecutor',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Prosecutor details | Common Platform'
        }
      },
      {
        path: 'edit-prosecutor',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Prosecutor details | Common Platform'
        }
      },
      {
        path: 'hearing',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Hearing details | Common Platform'
        }
      },
      {
        path: 'edit-hearing',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Hearing details | Common Platform'
        }
      },
      {
        path: 'defendant',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Defendant details | Common Platform'
        }
      },
      {
        path: 'edit-defendant',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Defendant details | Common Platform'
        }
      },
      {
        path: 'offence',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Add offences | Common Platform'
        }
      },
      {
        path: 'edit-offence',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Add offences | Common Platform'
        }
      },
      {
        path: 'either-way-offence',
        component: ManualCaseCreateContainer
      },
      {
        path: 'edit-either-way-offence',
        component: ManualCaseCreateContainer
      },
      {
        path: 'summary',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Check case details | Common Platform'
        }
      },
      {
        path: 'case-created/:reference/:caseId',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Case created successfully | Common Platform'
        }
      },
      {
        path: 'duplicated-prosecutor',
        component: ManualCaseCreateContainer,
        data: {
          title: 'Prosecutor details | Common Platform'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualCaseRoutingModule {}
