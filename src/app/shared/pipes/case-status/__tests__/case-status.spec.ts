import { CaseStatusPipe } from '../case-status.pipe';

const COMPLETED = {
  actual: 'COMPLETED',
  expected: 'Completed'
};
const NO_PLEA_RECEIVED = {
  actual: 'NO_PLEA_RECEIVED',
  expected: 'No plea received'
};
const NO_PLEA_RECEIVED_READY_FOR_DECISION = {
  actual: 'NO_PLEA_RECEIVED_READY_FOR_DECISION',
  expected: 'No plea received - ready for decision'
};
const PLEA_RECEIVED_READY_FOR_DECISION = {
  actual: 'PLEA_RECEIVED_READY_FOR_DECISION',
  expected: 'Plea received - ready for decision'
};
const PLEA_RECEIVED_NOT_READY_FOR_DECISION = {
  actual: 'PLEA_RECEIVED_NOT_READY_FOR_DECISION',
  expected: 'Plea received - not ready for decision'
};
const WITHDRAWAL_REQUEST_READY_FOR_DECISION = {
  actual: 'WITHDRAWAL_REQUEST_READY_FOR_DECISION',
  expected: 'Withdrawal requested - ready for decision'
};
const REFERRED_FOR_COURT_HEARING = {
  actual: 'REFERRED_FOR_COURT_HEARING',
  expected: 'Referred for court hearing'
};
const REOPENED_IN_LIBRA = {
  actual: 'REOPENED_IN_LIBRA',
  expected: 'Reopened in Libra'
};
const SET_ASIDE_READY_FOR_DECISION = {
  actual: 'SET_ASIDE_READY_FOR_DECISION',
  expected: 'Set aside - ready for decision'
};
const COMPLETED_APPLICATION_PENDING = {
  actual: 'COMPLETED_APPLICATION_PENDING',
  expected: 'Completed - application pending'
};
const APPEALED = {
  actual: 'APPEALED',
  expected: 'Appealed'
};
const RELISTED = {
  actual: 'RELISTED',
  expected: 'Relisted'
};

const UNEXPECTED = 'This is not expected';

describe('Case Status Pipe', () => {
  let pipe: CaseStatusPipe;

  beforeEach(() => {
    pipe = new CaseStatusPipe();
  });

  it('should map COMPLETED to Completed', () => {
    expect(pipe.transform(COMPLETED.actual)).toEqual(COMPLETED.expected);
  });

  it('should map NO_PLEA_RECEIVED to No plea received', () => {
    expect(pipe.transform(NO_PLEA_RECEIVED.actual)).toEqual(NO_PLEA_RECEIVED.expected);
  });

  it('should map NO_PLEA_RECEIVED_READY_FOR_DECISION to No plea received - ready for decision', () => {
    expect(pipe.transform(NO_PLEA_RECEIVED_READY_FOR_DECISION.actual)).toEqual(
      NO_PLEA_RECEIVED_READY_FOR_DECISION.expected
    );
  });

  it('should map PLEA_RECEIVED_READY_FOR_DECISION to Plea received - ready for decision', () => {
    expect(pipe.transform(PLEA_RECEIVED_READY_FOR_DECISION.actual)).toEqual(PLEA_RECEIVED_READY_FOR_DECISION.expected);
  });

  it('should map PLEA_RECEIVED_NOT_READY_FOR_DECISION to Plea received - not ready for decision', () => {
    expect(pipe.transform(PLEA_RECEIVED_NOT_READY_FOR_DECISION.actual)).toEqual(
      PLEA_RECEIVED_NOT_READY_FOR_DECISION.expected
    );
  });

  it('should map WITHDRAWAL_REQUEST_READY_FOR_DECISION to Withdrawal requested - ready for decision', () => {
    expect(pipe.transform(WITHDRAWAL_REQUEST_READY_FOR_DECISION.actual)).toEqual(
      WITHDRAWAL_REQUEST_READY_FOR_DECISION.expected
    );
  });

  it('should map REFERRED_FOR_COURT_HEARING to Referred for court hearing', () => {
    expect(pipe.transform(REFERRED_FOR_COURT_HEARING.actual)).toEqual(REFERRED_FOR_COURT_HEARING.expected);
  });

  it('should map REOPENED_IN_LIBRA to Reopened in Libra', () => {
    expect(pipe.transform(REOPENED_IN_LIBRA.actual)).toEqual(REOPENED_IN_LIBRA.expected);
  });

  it('should map SET_ASIDE_READY_FOR_DECISION to Reopened in Libra', () => {
    expect(pipe.transform(SET_ASIDE_READY_FOR_DECISION.actual)).toEqual(SET_ASIDE_READY_FOR_DECISION.expected);
  });

  it('should map COMPLETED_APPLICATION_PENDING to Completed - application pending', () => {
    expect(pipe.transform(COMPLETED_APPLICATION_PENDING.actual)).toEqual(COMPLETED_APPLICATION_PENDING.expected);
  });

  it('should map APPEALED to Appealed', () => {
    expect(pipe.transform(APPEALED.actual)).toEqual(APPEALED.expected);
  });

  it('should map RELISTED to Relisted', () => {
    expect(pipe.transform(RELISTED.actual)).toEqual(RELISTED.expected);
  });

  it('should not map any other response', () => {
    expect(pipe.transform(UNEXPECTED)).toEqual(UNEXPECTED);
  });
});
