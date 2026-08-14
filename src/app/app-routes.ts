import { Routes } from '@angular/router';
import { CaseDataGuard, DefendantDetailsUpdatesLinkDataGuard, PleadedNotGuiltyDataGuard } from './core/guards';
import { CaseNotesGuard } from './core/guards/case-notes.guard';
import { SjpNoticeCasesDataGuard } from './cases-missing-sjp-notices/sjp-notice-cases-data.guard';
import { RegionsGuard } from './core/guards/regions.guard';
import { ERROR_PAGES_ROUTES, ERROR_ROUTE_PATHS, SYSTEM_ANNOUNCEMENT_ROUTES } from '@cpp/application';
import { UserPermissionsGuard } from '@cpp/users-groups';
import { ProsecutorByCodeGuard } from './shared/guards/prosecutorByCode.guard';
import { CasesMissingSjpNoticesGuard } from './cases-missing-sjp-notices/cases-missing-sjp-notices.guard';
import { DefendantDetailsUpdatesPageDataGuard } from './defendant-details-updates/defendant-details-updates.guard';
import { DatesToAvoidGuard } from './case-overview/dates-to-avoid/dates-to-avoid.guard';
import { OffenceWithdrawalReasonsGuard } from './case-overview/withdraw-offence/withdraw-offence.guard';
import { OnlinePleaGuard } from './core/guards/online-plea.guard';
import { AlcoholLevelMethodsGuard } from './core/guards/alcohol-level-methods';
import { PoliceForcesGuard } from './core/guards/police-forces';
import { OffenceDateCodesGuard } from './core/guards/offence-date-codes';
import { RemandStatusesGuard } from './core/guards/remand-statuses';
import { HearingTypesGuard, OrganisationUnitsGuard, PleaTypesGuard, ProsecutorsGuard } from '@cpp/reference-data';
import { SummonsCodesGuard } from './core/guards/summons-codes';
import { VerdictTypesGuard } from './core/guards/verdict-types';
import { MotReasonsGuard } from './core/guards/mot-reasons';
import { EthnicitiesGuard } from './shared/guards/ethnicities.guard';
import { EthnicityCodesGuard } from './shared/guards/ethnicity-codes.guard';
import { NationalitiesGuard } from './shared/guards/nationalities.guard';
import { SearchGuard } from './search/search.guard';
import { ResetGuard } from './search/reset.guard';
import { ManualCaseCreateContainer } from './manual-case/manual-case-create.container';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [UserPermissionsGuard],
    data: {
      serviceUnavailableRedirectTo: `/${ERROR_ROUTE_PATHS.serviceUnavailable}`
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user'
      },
      {
        path: 'user',
        loadComponent: () => import('./dashboard/dashboard.container').then(m => m.DashboardContainer),
        canActivate: [
          PleadedNotGuiltyDataGuard,
          DefendantDetailsUpdatesLinkDataGuard,
          SjpNoticeCasesDataGuard,
          ProsecutorByCodeGuard
        ]
      },
      {
        path: 'tfl',
        redirectTo: 'user',
        pathMatch: 'prefix'
      },
      {
        path: ':role/search',
        data: {
          title: 'Search for a case | Common platform'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            canActivate: [ResetGuard],
            loadComponent: () =>
              import('./search/search-results/seach-results.container').then(m => m.SearchResultsContainer)
          },
          {
            path: ':keyword',
            canActivate: [SearchGuard],
            loadComponent: () =>
              import('./search/search-results/seach-results.container').then(m => m.SearchResultsContainer)
          }
        ]
      },
      {
        path: ':role/case-overview/:caseId',
        canActivate: [CaseDataGuard, CaseNotesGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./case-overview/overview/overview.container').then(m => m.OverviewContainer),
            data: { title: 'Case Overview | Common platform' }
          },
          {
            path: 'withdraw-offence',
            loadComponent: () =>
              import('./case-overview/withdraw-offence/withdraw-offence.container').then(
                m => m.WithdrawOffenceContainer
              ),
            canActivate: [OffenceWithdrawalReasonsGuard],
            data: { title: 'Manage offence withdrawals | Common platform' }
          },
          {
            path: 'dates-to-avoid',
            loadComponent: () =>
              import('./case-overview/dates-to-avoid/dates-to-avoid.container').then(m => m.DatesToAvoidContainer),
            canActivate: [DatesToAvoidGuard],
            data: { title: 'Dates to avoid | Common platform' }
          },
          {
            path: 'online-plea-details',
            loadComponent: () =>
              import('./case-overview/online-plea-details/online-plea-details.container').then(
                m => m.OnlinePleaDetailsContainer
              ),
            canActivate: [OnlinePleaGuard],
            data: { title: 'Online plea | Common platform' }
          }
        ]
      },
      {
        path: ':role/review-not-guilty-pleas',
        redirectTo: ':role/review-not-guilty-pleas/ALL/ALL'
      },
      {
        path: ':role/review-not-guilty-pleas/:regionFilter/:prosecutorFilter',
        loadComponent: () =>
          import('./review-not-guilty-pleas/review-not-guilty-pleas.container').then(
            m => m.ReviewNotGuiltyPleasContainer
          ),
        canActivate: [PleadedNotGuiltyDataGuard, RegionsGuard],
        data: {
          title: 'Review not guilty pleas | Common platform'
        }
      },
      {
        path: 'user/cases-missing-sjp-notices',
        loadComponent: () =>
          import('./cases-missing-sjp-notices/cases-missing-sjp-notices.container').then(
            m => m.CasesMissingSjpNoticesContainer
          ),
        canActivate: [CasesMissingSjpNoticesGuard],
        data: {
          title: 'Cases missing SJP notices | Common platform'
        }
      },
      {
        path: ':role/export-case-decisions',
        loadComponent: () =>
          import('./export-case-decisions/export-case-decisions.container').then(m => m.ExportCaseDecisionsContainer),
        data: {
          title: 'Export Case Decisions | Common platform'
        }
      },
      {
        path: ':role/defendant-details-updates',
        redirectTo: ':role/defendant-details-updates/ALL/ALL'
      },
      {
        path: ':role/defendant-details-updates/:regionFilter/:prosecutorFilter',
        loadComponent: () =>
          import('./defendant-details-updates/defendant-details-updates.container').then(
            m => m.DefendantDetailsUpdatesContainer
          ),
        canActivate: [DefendantDetailsUpdatesPageDataGuard, RegionsGuard],
        data: {
          title: 'Defendant details updates | Common platform'
        }
      },
      {
        path: 'accessibility',
        loadComponent: () =>
          import('./shared/accessibility/accessibility.component').then(m => m.AccessibilityComponent),
        data: { title: 'Accessibility | Common platform' }
      },
      {
        path: 'manual-case',
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
    ]
  },
  ...SYSTEM_ANNOUNCEMENT_ROUTES,
  ...ERROR_PAGES_ROUTES
];
