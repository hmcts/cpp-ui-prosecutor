import { SavedDecisionInformationPipe } from '../saved-decision-information.pipe';
import { MOCK_CASE_DECISION, MOCK_CASE_DECISSION_WITH_LEGACY_OFFENCE_DECISION } from './test-mock-data';

describe('Saved Decision Information Pipe', () => {
  let pipe: SavedDecisionInformationPipe;

  beforeEach(() => {
    pipe = new SavedDecisionInformationPipe();
  });

  it('should display Withdraw decision information if decision type is Withdraw', () => {
    expect(pipe.transform(MOCK_CASE_DECISION.offenceDecisions[0])).toEqual('Withdrawn - Insufficient evidence');
  });

  it('should display Adjourn decision information if decision type is Adjourn', () => {
    expect(pipe.transform(MOCK_CASE_DECISION.offenceDecisions[1])).toEqual('Adjourned to 11 Jun 2019 (or after)');
  });

  it('should display Court referral decision information if decision type is Refer for court hearing', () => {
    expect(pipe.transform(MOCK_CASE_DECISION.offenceDecisions[2])).toEqual(
      'Referred for court hearing - Not suitable for SJP'
    );
  });

  it('should display Dismissed  decision information if decision type is Dismissed', () => {
    expect(pipe.transform(MOCK_CASE_DECISION.offenceDecisions[3])).toEqual('Dismissed');
  });

  it('should display Referred to full court hearing  decision information if decision type is Refer to open court', () => {
    expect(pipe.transform(MOCK_CASE_DECISSION_WITH_LEGACY_OFFENCE_DECISION.offenceDecisions[0])).toEqual('Referred to full court hearing');
  });

  it('should display Referred for future sjp session decision information if decision type is Referred for future sjp session', () => {
    expect(pipe.transform(MOCK_CASE_DECISSION_WITH_LEGACY_OFFENCE_DECISION.offenceDecisions[1])).toEqual('Referred for future SJP session');
  });

  it('should throw error if decision type is unknown', () => {
    MOCK_CASE_DECISSION_WITH_LEGACY_OFFENCE_DECISION.offenceDecisions[1].decisionType = 'BLA';
    expect(() => pipe.transform(MOCK_CASE_DECISSION_WITH_LEGACY_OFFENCE_DECISION.offenceDecisions[1])).toThrow('Invalid decision type BLA');
  });
});
