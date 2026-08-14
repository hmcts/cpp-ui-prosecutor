import { SelectOption } from '@cpp/pdk';

export interface Ethnicity {
  id: string;
  sequence: number;
  code: string;
  description: string;
}

export interface EthnicitiesOptions {
  ethnicities: SelectOption[];
  observedEthnicities: SelectOption[];
}
