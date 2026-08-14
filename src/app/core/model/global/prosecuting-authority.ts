import { ProsecutionOrganisationType } from '@cpp/reference-data';
import { Address, Contact } from './';

export interface ProsecutionAuthority {
  prosecutionAuthorityId: string;
  prosecutionAuthorityCode: string;
  prosecutionAuthorityOUCode?: string;
  prosecutionAuthorityReference?: string;
  majorCreditorCode?: string;
  caseURN?: string;
  name?: string;
  accountCode?: string;
  welshName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: Address;
  contact?: Contact;
  prosecutorCategory?: ProsecutionOrganisationType;
  standard?: boolean;
  isInformant?: boolean;
}
