export type RepresentationType =
  | 'REPRESENTATION_ORDER'
  | 'REPRESENTATION_ORDER_APPLIED_FOR'
  | 'COURT_APPOINTED'
  | 'PRO_BONO'
  | 'PRIVATE';

export interface AssociatedOrganisation {
  defendantId: string; // injected by the service to help locate the entry for a specific defendant
  organisationId: string;
  organisationName: string;
  representationType: RepresentationType;
  status: string;
  email?: string; // populated by prosecutionService.getOrganisationDetails
  phoneNumber?: string; // populated by prosecutionService.getOrganisationDetails
  startDate: string;
  address: {
    // @cpp.ui.core does not export the Address interface along with the address pipe
    address1: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    addressPostcode?: string;
  };
}
