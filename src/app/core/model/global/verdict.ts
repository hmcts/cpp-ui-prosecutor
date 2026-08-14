export interface Verdict {
  originatingHearingId: string;
  offenceId: string;
  verdictDate: string;
  verdictType: {
    verdictTypeId: string;
    sequence?: number;
    description: string;
    category: string;
    categoryType: string;
    cjsVerdictCode?: string;
  };
  jurors?: {
    numberOfJurors: number;
    numberOfSplitJurors: number;
    unanimous: boolean;
  };
  lesserOrAlternativeOffence?: {
    offenceDefinitionId: string;
    offenceCode: string;
    offenceTitle: string;
    offenceTitleWelsh?: string;
    offenceLegislation: string;
    offenceLegislationWelsh?: string;
  };
  verdictValue?: string;
}

export const LESSER_OR_ALTERNATIVE_OFFENCE_CJS_VERDICT_CODE = 'A';
