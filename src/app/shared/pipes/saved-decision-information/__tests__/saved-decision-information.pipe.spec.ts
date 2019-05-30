import { SavedDecisionInformationPipe } from '../saved-decision-information.pipe';
import { MOCK_CASE_DECISION } from './test-mock-data';

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
});
