import { CaseData } from '../interfaces';
import { OFFENCE_CODES, randomIntFromRange } from '../utils';
import { subtractDays } from '../utils/date';
import * as _ from 'lodash';
import { stageProsecutorCase } from '../../tools/contexts/staging';
import { fetchCaseWithCondition } from './cases';
import { User, info, error } from '@cpp/ui.priming';

const { offenceData } = require('../fixtures/json/offence.json');

export abstract class ProsecutorCaseDataBuilder {
  constructor(protected data: CaseData, protected systemUser: User) {}

  setupBaseCaseData(urn = null, postedDaysAgo = 28, prosecutor: string, numberOfOffences: number = 1) {
    if (!urn) {
      urn = prosecutor + randomIntFromRange(100000000, 9999999999);
    }
    this.setUrn(urn);
    this.setDefendantSurname('Protractor-' + urn.replace(prosecutor, ''));
    this.setDefendantDob('1977-10-17');
    this.setChargePostingDate(subtractDays(postedDaysAgo));
    for (let i = 1; i <= numberOfOffences; i++) {
      this.addOffence(this.createOffence(_.sample(OFFENCE_CODES), i));
    }
    this.setupProsecutorSpecificBaseData();
  }

  createOffence(offenceCode = OFFENCE_CODES[0], sequenceNumber = 1) {
    return {
      ...offenceData,
      offenceSequenceNo: sequenceNumber,
      cjsOffenceCode: offenceCode,
      chargeDate: subtractDays(30),
      offenceStartDate: subtractDays(35),
      offenceCommittedDate: subtractDays(30)
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

  private addOffence(offence: CaseData) {
    this.data.defendant.offences = [...this.data.defendant.offences, offence];
    return this;
  }

  getData() {
    return this.data;
  }

  setupProsecutorSpecificBaseData() {
    // overwrite this method to add additional basic setup data for your prosecutor
  }

  async build(name: string) {
    info(`'${name}' building...`);
    try {
      const result = await this.sendAndFetchCase();

      info(`'${name}' completed with URN of '${result.urn}'.`);

      return result;
    } catch (err) {
      error(`'${name}' failed to build: ${JSON.stringify(err)}`);

      throw err;
    }
  }

  async sendAndFetchCase() {
    await this.sendCase();
    const kase = await fetchCaseWithCondition(this.getUrn(), pollCase => pollCase.status === 'NO_PLEA_RECEIVED_READY_FOR_DECISION');
    return kase;
  }

  async sendCase() {
    await stageProsecutorCase(this.getData(), this.systemUser);
  }
}
