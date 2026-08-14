import { exportCaseDecisionsReducer } from '../export-case-decisions.reducer';
import { LoadResultedCaseCountSuccess } from '../export-case-decisions.actions';
import { CaseCountResult } from '../../contexts/mi-report';

describe('Export case results by date/reducer', () => {
  it('should set the default state', () => {
    const result = exportCaseDecisionsReducer(null, {} as any);
    expect(result).toEqual(null);
  });

  it('should set the resulted case count', () => {
    const action = new LoadResultedCaseCountSuccess({
      casesResultedCount: 10
    } as CaseCountResult);

    const result = exportCaseDecisionsReducer(null, action);
    expect(result).toEqual({ casesResultedCount: 10 } as CaseCountResult);
  });
});
