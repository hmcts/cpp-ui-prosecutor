import { Address, Contact } from '.';

export interface Organisation {
  id?: string;
  name: string;
  incorporationNumber?: string;
  registeredCharityNumber?: string;
  address?: Address;
  contact?: Contact;
}

export interface AssociatedDefenceOrganisation {
  applicationReference: string;
  associationEndDate: string;
  associationStartDate: string;
  defenceOrganisation: {
    laaContractNumber: string[];
    organisation: Organisation;
  };
  fundingType: string;
  isAssociatedByLAA: boolean;
}
