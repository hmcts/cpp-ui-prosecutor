import { User } from '@cpp/ui.priming';
import { Case } from '../../../../src/app/contexts/sjp';
import { assignCaseToUser, startSession, fetchSession, fetchCaseWithCondition } from '../../../../tools/helpers';
import { LEGAL_ADVISER } from '../../../../tools/utils';
import { v4 as uuid } from 'uuid';
import { makeDecision } from '../../../../tools/contexts/sjp';
import { createTvlCaseWithMultipleOffences } from '../../../../tools/factory';
import moment = require('moment');
import { createPoliceCase } from '../../../../tools/factory/police-build-case';
import { PoliceCaseDataBuilder } from '../../../../tools/helpers/police-case-data-builder';

export class CaseCompleter {
  public sessionId: string;
  public kase: Case;

  constructor(
    protected user: User,
  ) {}

  public async getPostAdjournedCase() {
    await this.createTvlCase();
    await this.setup();
    await this.makePostAdjournDecision();
    return this.kase;
  }

  /**
   * Police case with excise penalty
   */
  public async getFinancialPenaltyCase() {
    await this.createPoliceCase();
    await this.setup();
    await this.makeFinancialPenaltyDecision();
    return this.kase;
  }

  /**
   * Police case with excise penalty
   */
  public async getDischargeCase() {
    await this.createPoliceCase();
    await this.setup();
    await this.makeDischargeDecision();
    return this.kase;
  }

  private async setup() {
    await this.assignCase();
    await this.startSession();
  }

  private async createTvlCase() {
    this.kase = await createTvlCaseWithMultipleOffences(28, 2);
  }

  private async createPoliceCase() {
    this.kase = await createPoliceCase(PoliceCaseDataBuilder.createCaseDataForMultipleOffences(2));
  }

  private async assignCase() {
    await assignCaseToUser(this.kase.id, LEGAL_ADVISER);
    await fetchCaseWithCondition(this.kase.urn, kase => kase.assigned);
  }

  private async startSession() {
    this.sessionId = uuid();
    await startSession(this.sessionId, this.user);
    await fetchSession(this.sessionId, this.user);
  }

  private async makePostAdjournDecision() {
    const noOfCaseDecisions = this.kase.caseDecisions ? this.kase.caseDecisions.length : 0;
    await makeDecision(this.sessionId, this.user, this.kase, [
      {
        type: 'ADJOURN',
        offenceDecisionInformation: [
          {
            offenceId: this.kase.defendant.offences[0].id,
            verdict: 'PROVED_SJP'
          },
          {
            offenceId: this.kase.defendant.offences[1].id,
            verdict: 'PROVED_SJP'
          }
        ],
        adjournTo: moment().add(7, 'days').format('YYYY-MM-DD'),
        reason: 'A simple ajournment reason'
      }
    ]);
    this.kase = await fetchCaseWithCondition(this.kase.urn, kase => {
      return kase.caseDecisions.length > noOfCaseDecisions;
    });
  }

  private async makeFinancialPenaltyDecision() {
    const noOfCaseDecisions = this.kase.caseDecisions ? this.kase.caseDecisions.length : 0;
    await makeDecision(this.sessionId, this.user, this.kase, [
      {
        type: 'FINANCIAL_PENALTY',
        offenceDecisionInformation: {
          offenceId: this.kase.defendant.offences[0].id,
          verdict: 'FOUND_GUILTY'
        },
        excisePenalty: 40,
        backDuty: 12,
        compensation: 15.3,
        guiltyPleaTakenIntoAccount: false,
        disqualification: false
     },
     {
        type: 'FINANCIAL_PENALTY',
        offenceDecisionInformation: {
          offenceId: this.kase.defendant.offences[1].id,
          verdict: 'FOUND_GUILTY'
        },
        excisePenalty: 60,
        backDuty: 14,
        compensation: 15.3,
        guiltyPleaTakenIntoAccount: false,
        disqualification: false
     }
    ], {
      costsAndSurcharge: {
        costs: 20.1,
        collectionOrderMade: true
      },
      payment: {
        paymentType: 'PAY_TO_COURT',
        totalSum: 150.7,
        reasonWhyNotAttachedOrDeducted: 'No information from defendant',
        paymentTerms: {
          reserveTerms: false,
          lumpSum: {
            amount: 150.7,
            withinDays: 14
          }
        }
      }
    });
    this.kase = await fetchCaseWithCondition(this.kase.urn, kase => {
      return kase.caseDecisions.length > noOfCaseDecisions;
    });
  }

  private async makeDischargeDecision() {
    const noOfCaseDecisions = this.kase.caseDecisions ? this.kase.caseDecisions.length : 0;
    await makeDecision(this.sessionId, this.user, this.kase, [
      {
        type: 'DISCHARGE',
        dischargeType: 'CONDITIONAL',
        dischargedFor: {
          unit: 'MONTH',
          value: 3
        },
        offenceDecisionInformation: {
          offenceId: this.kase.defendant.offences[0].id,
          verdict: 'FOUND_GUILTY'
        },
        backDuty: 12,
        compensation: 15,
        guiltyPleaTakenIntoAccount: false,
        disqualification: false
     },
     {
        type: 'DISCHARGE',
        dischargeType: 'CONDITIONAL',
        dischargedFor: {
          unit: 'MONTH',
          value: 3
        },
        offenceDecisionInformation: {
          offenceId: this.kase.defendant.offences[1].id,
          verdict: 'FOUND_GUILTY'
        },
        backDuty: 14,
        compensation: 15,
        guiltyPleaTakenIntoAccount: false,
        disqualification: false
     }
    ], {
      costsAndSurcharge: {
         costs: 20,
         collectionOrderMade: true,
         victimSurcharge: 30,
      },
      payment: {
        paymentType: 'PAY_TO_COURT',
        totalSum: 106,
        reasonWhyNotAttachedOrDeducted: 'No information from defendant',
        paymentTerms: {
          reserveTerms: false,
          lumpSum: {
            amount: 106,
            withinDays: 14
          }
        }
      }
    });
    this.kase = await fetchCaseWithCondition(this.kase.urn, kase => {
      return kase.caseDecisions.length > noOfCaseDecisions;
    });
  }
}
