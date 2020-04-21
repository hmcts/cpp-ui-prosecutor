import { ProsecutorCaseDataBuilder } from './prosecutor-case-data-builder';
import { CaseData } from '../interfaces';
import * as _ from 'lodash';
import { SYSTEM_DVLA_USER } from '../../tools/utils';
import { CaseDataBuilder } from './case-data-builder';
import { stageProsecutorCaseV2 } from '../../tools/contexts/staging';

export class PoliceCaseDataBuilder extends ProsecutorCaseDataBuilder {

  public static readonly ProsecutorAuthority = '0230000';

  constructor(protected data: CaseData) {
    super(data, SYSTEM_DVLA_USER);
  }

  static createCaseData(urn = null, postedDaysAgo = 28): PoliceCaseDataBuilder {
    const dataBuilder = new PoliceCaseDataBuilder(CaseDataBuilder.createCaseDataPayload());
    dataBuilder.setupBaseCaseData(urn, postedDaysAgo, 'POLICE');
    return dataBuilder;
  }

  static createCaseDataForMultipleOffences(
    numberOfOffences: number = 2,
    urn: string = null,
    postedDaysAgo: number = 28
  ): PoliceCaseDataBuilder {
    const dataBuilder = new PoliceCaseDataBuilder(CaseDataBuilder.createCaseDataPayload());
    dataBuilder.setupBaseCaseData(urn, postedDaysAgo, 'POLICE', numberOfOffences);
    return dataBuilder;
  }

  setupProsecutorSpecificBaseData() {
    this.data.prosecutionSubmissionDetails.prosecutingAuthority = PoliceCaseDataBuilder.ProsecutorAuthority;
    this.data.defendant.offences.forEach(offence => offence.cjsOffenceCode = 'RT88971');
  }

  async sendCase() {
    await stageProsecutorCaseV2(this.getData(), this.systemUser, PoliceCaseDataBuilder.ProsecutorAuthority);
  }
}
