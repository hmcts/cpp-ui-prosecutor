import { Address } from '../global/address';

export interface OrganisationDivision extends Address {
  emailAddress: string;
  id: string;
  orgName: string;
  orgType: 'NPS';
  seqNum: number;
  startDate: string;
  phoneNo: string;
}
