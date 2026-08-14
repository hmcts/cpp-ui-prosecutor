import { DelegatedPowers } from '.';
export interface Plea {
  originatingHearingId: string;
  delegatedPowers?: DelegatedPowers;
  offenceId: string;
  pleaDate: string;
  pleaValue: string;
  lesserOrAlternativeOffence?: {
    offenceDefinitionId: string;
    offenceCode: string;
    offenceTitle: string;
    offenceTitleWelsh?: string;
    offenceLegislation: string;
    offenceLegislationWelsh?: string;
  };
}
