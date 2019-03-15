import { TestBed } from '@angular/core/testing';
import { entitiesReducer, PleadedNotGuiltyCasesDetailState } from '../entities.reducer';
import { LoadPleadedNotGuiltyCases } from '../../actions/entities';
import { MOCK_PENDING_DATES_TO_AVOID } from '../../../dashboard/__tests__/test-mock-data';

describe('Entities Reducer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [entitiesReducer]
    });
  });

  it('should reduce to the new state', () => {
    const oldState = {} as PleadedNotGuiltyCasesDetailState;
    const newState = MOCK_PENDING_DATES_TO_AVOID;

    const result = entitiesReducer(oldState, new LoadPleadedNotGuiltyCases(newState));

    expect(result).toMatchSnapshot();
  });

  it('should reduce to the same base state When the action doesnt match', () => {
    const action = {} as any;

    const result = entitiesReducer(undefined, action);

    expect(result).toMatchSnapshot();
  });
});
