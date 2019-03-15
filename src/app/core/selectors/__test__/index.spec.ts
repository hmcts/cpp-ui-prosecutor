import { TestBed } from '@angular/core/testing';
import { getPleadedNotGuiltyCasesDetail } from '../index';
import { State } from '../../../reducers';
import { MOCK_PENDING_DATES_TO_AVOID } from '../../../dashboard/__tests__/test-mock-data';

describe('Selectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [getPleadedNotGuiltyCasesDetail]
    });
  });

  it('should select the right data from the store', () => {
    const state = {
      pleadedNotGuiltyCasesDetail: MOCK_PENDING_DATES_TO_AVOID
    } as State;

    const selectedState = getPleadedNotGuiltyCasesDetail(state);

    expect(selectedState).toMatchSnapshot();
  });
});
