import { formatDate, getAgeFromDate, subtractDays } from '../utils/date';
import { getFixture, randomIntFromRange, zipDocFile } from '../utils';
import { CaseData, StagingParam } from '../interfaces';

export class TflCaseDataBuilder {
  constructor(private data: CaseData) {}

  static getRandomUrnSuffix() {
    return randomIntFromRange(100000000, 9999999999);
  }

  public static initCaseData(urn, postedDaysAgo: number = 28): TflCaseDataBuilder {
    const dataBuilder = new TflCaseDataBuilder(sjpCaseData);
    const postingDate = subtractDays(postedDaysAgo);
    const defendantDob = '1977-10-17';
    const defendantAge = getAgeFromDate(defendantDob);

    return dataBuilder
      .set('urn', urn)
      .set('postingDate', postingDate)
      .set('chargeDate', subtractDays(30))
      .set('offenceStartDate', subtractDays(35))
      .set('defDateOfBirth', defendantDob)
      .set('postingDateFormatted', formatDate(postingDate))
      .set('defendantBirthFormatted', formatDate(defendantDob) + ' (' + defendantAge + ' years old)')
      .set('defendantBirthOnCaseOverview', formatDate(defendantDob) + ' (' + defendantAge + ')');
  }

  static createCaseDataForTfl(urn = null, postedDaysAgo: number = 28): TflCaseDataBuilder {
    if (!urn) {
      urn = 'TFL' + TflCaseDataBuilder.getRandomUrnSuffix();
    }

    const dataBuilder = TflCaseDataBuilder.initCaseData(urn, postedDaysAgo);

    return dataBuilder
      .set('offenceCode', 'CA03013')
      .set('prosecutingAuthority', {
        shortCode: 'TFL',
        label: 'Transport for London'
      })
      .set('defendantSurname', 'Protractor-' + urn.replace('TFL', ''));
  }

  set(key: string, value: any) {
    this.data[key] = value;
    return this;
  }

  public getUrn() {
    return this.data.urn;
  }

  public buildSjpnFileName(): string {
    return this.data.defendantSurname + '_' + this.data.defendantName + '_' + this.data.urn + '_SJPN';
  }

  public buildStagingParam(): StagingParam {
    return {
      caseData: this.toCaseHeaderValue(),
      offenceData: this.toCaseOffenceValue()
    };
  }

  private toCaseHeaderValue(): string {
    return (
      `${this.data.urn},2041321,J,GAFTL00,M,TRANSPORT FOR LONDON,B01LY75,2016-11-05,11:00:00,,2,10.99,6,` +
      `${this.data.postingDate},,,,` +
      `Mr,${this.data.defendantName},,,${this.data.defendantSurname},,,` +
      `${this.data.defAddress1},${this.data.defAddress2},,${this.data.defPostTown},` +
      `${this.data.defCounty},${this.data.defPostcode}` +
      `,,,,,,,${this.data.defendantBirth},,M`
    );
  }

  private toCaseOffenceValue() {
    return (
      `${this.data.urn},1,${this.data.offenceCode},,,,${this.data.chargeDate},1,${this.data.offenceStartDate},,,,,,,` +
      `${this.data.offenceWording}, ${this.data.offenceProsecutionFacts},` +
      `Dear Transport for London I would like copies of the following 1.` +
      `All MG11 Statement templates which are written by RPIs.` +
      `already worded for ease of completion to cover ticketless travel fare evasion and bylaw offences.` +
      `If possible in word document format.` +
      `If these are not available examples of previously used statements` +
      `(obviously omitting the RPI & Defendants details)` +
      `which have successfully been used in court.`
    );
  }
}

const { sjpCaseData } = require('../fixtures/json/tfl-case-template.json');
