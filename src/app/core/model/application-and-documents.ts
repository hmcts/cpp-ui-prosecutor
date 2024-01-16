import { FilterOption } from './';

import { OrganisationUnit } from '@cpp/reference-data';

export enum ApplicationCreationRoutes {
  SELECT_TYPE = 'select-type',
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
  SUBJECT = 'subject',
  RELATED_CASES = 'related-cases',
  THIRD_PARTY = 'third-party',
  OFFENCES = 'offences',
  ACTIVE_ORDERS = 'active-orders',
  REFER_DECISION = 'refer-decision',
  REFER_TO_COURT = 'list-or-refer',
  VACATE_HEARING = 'vacate-hearing',
  COURT_LISTING = 'court-listing',
  OVERVIEW = 'overview',
  ALLOCATE_COURT = 'allocate-court',
  FIND_HEARING_DATE = 'find-hearing-date'
}

export interface FixedDateWeekCommencingInfo {
  dateType?: 'FIXED' | 'WEEK_COMMENCING' | 'DATE_TO_BE_FIXED';
  weekCommencingDuration?: 1 | 2;
  selectedCourtCentre?: OrganisationUnit;
  notes?: string;
  courtRoom?: FilterOption;
  courtCentre?: OrganisationUnit;
}
