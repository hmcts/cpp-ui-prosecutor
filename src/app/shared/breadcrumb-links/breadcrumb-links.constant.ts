import { Breadcrumb } from './breadcrumb-links.interface';

/* istanbul ignore file */
export const Breadcrumbs: { [name: string]: Breadcrumb } = {
  HOME: {
    id: 'home',
    title: 'Home',
    link: () => '/'
  },
  CASES_MISSING_SJP_NOTICES: {
    id: 'cases-missing-sjp-notices',
    title: 'Cases missing SJP Notices',
    link: () => '/'
  },
  SEARCH: {
    id: 'search',
    title: 'Search for a case',
    link: () => '/search'
  },
  REVIEW_NOT_GUILTY_PLEAS: {
    id: 'review-not-guilty-pleas',
    title: 'Review not guilty pleas',
    link: () => '/review-not-guilty-pleas'
  },
  EXPORT_CASE_DECISIONS: {
    id: 'export-case-decisions',
    title: 'Export case results by date',
    link: () => '/export-case-decisions'
  },
  CASE_OVERVIEW: {
    id: 'case-overview',
    title: 'Case details',
    link: (caseId: string) => `/case-overview/${caseId}`
  },
  DATES_TO_AVOID: {
    id: 'dates-to-avoid',
    title: 'Dates to avoid',
    link: (caseId: string) => `/case-overview/${caseId}/dates-to-avoid`
  },
  WITHDRAW_OFFENCE: {
    id: 'withdraw-offence',
    title: 'Withdraw offence',
    link: (caseId: string) => `/case-overview/${caseId}/withdraw-offence`
  },
  ONLINE_PLEA: {
    id: 'online-plea',
    title: 'Online plea',
    link: (caseId: string) => `/case-overview/${caseId}/online-plea`
  },
  DEFENDANT_DETAILS_UPDATES: {
    id: 'defendant-details-updates',
    title: 'Defendant details updates',
    link: () => '/defendant-details-updates'
  }
};
