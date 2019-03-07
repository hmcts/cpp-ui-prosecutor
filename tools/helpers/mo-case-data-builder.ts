import { CaseData } from '../interfaces';
import { randomIntFromRange } from '../utils';

const { multipleOffencesCaseData } = require('../fixtures/json/multiple-offences-template.json');

export class MoCaseDataBuilder {
  constructor(private data: CaseData) {}

  static createCaseDataForTvl(urn = null): MoCaseDataBuilder {
    if (!urn) {
      urn = 'TVL' + randomIntFromRange(100000000, 9999999999);
    }

    const dataBuilder = new MoCaseDataBuilder(multipleOffencesCaseData);
    dataBuilder.setUrn(urn);
    return dataBuilder;
  }

  getUrn() {
    return this.data.prosecutionSubmissionDetails.urn;
  }

  setUrn(urn: string) {
    return (this.data.prosecutionSubmissionDetails.urn = urn);
  }

  getData() {
    return this.data;
  }
}
