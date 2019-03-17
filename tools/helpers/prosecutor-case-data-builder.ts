import { CaseData } from '../interfaces';
import { getFixture, OFFENCE_CODES, randomIntFromRange } from '../utils';
import { subtractDays } from '../utils/date';
import { CaseDataBuilder } from './case-data-builder';

const { prosecutorCaseData } = require('../fixtures/json/prosecutor-case-template.json');
const { offenceData } = require('../fixtures/json/offence.json');

export class ProsecutorCaseDataBuilder extends CaseDataBuilder {
  constructor(private data: CaseData) {
    super();
  }

  static createCaseDataForTvl(urn = null, postedDaysAgo = 28): ProsecutorCaseDataBuilder {
    if (!urn) {
      urn = 'TVL' + randomIntFromRange(100000000, 9999999999);
    }

    const payload = JSON.parse(JSON.stringify(prosecutorCaseData));
    const dataBuilder = new ProsecutorCaseDataBuilder(payload);

    dataBuilder
      .setUrn(urn)
      .setDefendantSurname('Protractor-' + urn.replace('TVL', ''))
      .setDefendantDob('1977-10-17')
      .setChargePostingDate(subtractDays(postedDaysAgo))
      .addOffence(ProsecutorCaseDataBuilder.createOffence());
    return dataBuilder;
  }

  static createCaseDataForMultipleOffences(urn = null, postedDaysAgo = 28): ProsecutorCaseDataBuilder {
    const dataBuilder = ProsecutorCaseDataBuilder.createCaseDataForTvl(urn, postedDaysAgo);
    dataBuilder.addOffence(ProsecutorCaseDataBuilder.createOffence(OFFENCE_CODES[1], 2));

    return dataBuilder;
  }

  static createOffence(offenceCode = OFFENCE_CODES[0], sequenceNumber = 1) {
    return {
      ...offenceData,
      offenceSequenceNo: sequenceNumber,
      cjsOffenceCode: offenceCode,
      chargeDate: subtractDays(30),
      offenceStartDate: subtractDays(35),
      offenceCommittedDate: subtractDays(30)
    };
  }

  static createSjpnDocData(urn: string) {
    return {
      material: getFixture('docs/sjp_session_URN_SJPN.PDF'),
      caseUrn: urn,
      prosecutingAuthority: 'GAEAA01',
      materialType: 'SJPN'
    };
  }

  getUrn() {
    return this.data.prosecutionSubmissionDetails.urn;
  }

  setUrn(urn: string) {
    this.data.prosecutionSubmissionDetails.urn = urn;
    return this;
  }

  setChargePostingDate(date: string) {
    this.data.prosecutionSubmissionDetails.writtenChargePostingDate = date;
    return this;
  }

  setDefendantSurname(name: string) {
    this.data.defendant.defendantPerson.surname = name;
    return this;
  }

  setDefendantDob(dob: string) {
    this.data.defendant.dateOfBirth = dob;
    return this;
  }

  addOffence(offence: CaseData) {
    this.data.defendant.offences = [...this.data.defendant.offences, offence];
    return this;
  }

  getData() {
    return this.data;
  }
}
