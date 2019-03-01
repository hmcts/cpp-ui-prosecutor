export interface SearchResult {
  foundCasesWithOutdatedDefendantsName: boolean;
  results: CaseDetails[];
}

export interface CaseDetails {
  caseId: string;
  defendant: Defendant;
  assigned: boolean;
  completed: boolean;
  enterpriseId: string;
  listedInCriminalCourts: boolean;
  postingDate: string;
  prosecutingAuthority: string;
  status: string;
  urn: string;
}

export interface Defendant {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  outdated: boolean;
}
