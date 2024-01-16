import { manualCaseDetailsReducer, ManualCaseDetailsState } from '../manual-case-details';
import { LoadManualCaseDetailsSuccess, RemoveManualCaseOffence } from '../../actions';
import { ManualCaseDefendant } from '../../model';
import { ManualCaseOffence } from '../../model/manual-case-offence';
import { StoreManualCaseDefendantsEitherWayOffences } from '../../actions/manual-case-details.actions';

describe('manualCaseDetailsReducer', () => {
  let resultState: ManualCaseDetailsState;
  let action: any;
  let state: ManualCaseDetailsState;

  const mockDefendantWithOffences = {
    id: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
    offences: [
      {
        offenceCode: 'RT88584B',
        offenceSequenceNumber: 1,
        offenceLegislation:
          // prettier-ignore
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to the Road Traffic ' +
          'Offenders Act 1988 and section 44 of the Magistrates\' Courts Act 1980.',
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
        offenceDateCode: 3,
        offenceCommittedDate: '2018-12-01',
        offenceWording: 'some offence wording'
      },
      {
        offenceCode: 'RT88945C',
        offenceSequenceNumber: 1,
        offenceLegislation:
          'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to the ' +
          `Road Traffic Offenders Act 1988 and section 44 of the Magistrates' Courts Act 1980.`,
        offenceTitle:
          'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
        offenceId: '7a80c7c5-5fef-4fb1-b400-2811cd918cdd',
        offenceDateCode: 3,
        offenceCommittedDate: '2018-12-01',
        offenceWording: 'some offence wording'
      }
    ] as ManualCaseOffence[]
  } as ManualCaseDefendant;

  describe('when initialised', () => {
    beforeEach(() => {
      action = {} as any;
      resultState = manualCaseDetailsReducer(undefined, action);
    });

    it('should set the default state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_MANUAL_CASE_DETAILS_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadManualCaseDetailsSuccess({
        caseDetails: {
          caseId: 'manual-case-id-001',
          initiationCode: 'S',
          summonsCode: 'E'
        }
      } as ManualCaseDetailsState);

      state = {
        caseDetails: {}
      } as ManualCaseDetailsState;
      resultState = manualCaseDetailsReducer(state, action);
    });

    it('should populate the state with details', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when REMOVE_MANUAL_CASE_OFFENCE', () => {
    beforeEach(() => {
      action = new RemoveManualCaseOffence({
        defendantId: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
        offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa'
      });

      const initialState = {
        defendants: [mockDefendantWithOffences]
      } as ManualCaseDetailsState;

      resultState = manualCaseDetailsReducer(initialState, action);
    });

    it('should remove given offence', () => {
      expect(resultState.defendants).toEqual([
        { id: mockDefendantWithOffences.id, offences: [mockDefendantWithOffences.offences[1]] }
      ]);
    });
  });

  describe('when STORE_MANUAL_CASE_DEFENDANTS_EITHER_WAY_OFFENCES', () => {
    let mockDefendantsWithEitherWayOffences;
    beforeEach(() => {
      mockDefendantsWithEitherWayOffences = [
        {
          id: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
          offences: [
            {
              offenceCode: 'RT88584B',
              offenceSequenceNumber: 1,
              offenceLegislation:
                // prettier-ignore
                'Contrary to section 5A(1)(a) of the Road Traffic Act 1988 and Schedule 2 to the Road Traffic ' +
              'Offenders Act 1988 and section 44 of the Magistrates\' Courts Act 1980.',
              offenceTitle:
                'Aid abet the driving of a motor vehicle with a proportion of a specified controlled drug above the specified limit',
              offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
              offenceDateCode: 3,
              offenceCommittedDate: '2018-12-01',
              offenceWording: 'some offence wording',
              plea: {
                pleaValue: 'guilty',
                pleaDate: '2020-10-10'
              },
              verdict: {
                verdictDate: '2020-10-10',
                verdictType: {
                  id: 'de77e8d8-4893-4703-8ae1-86dd75cfedf8',
                  category: 'category',
                  categoryType: 'categoryType'
                }
              }
            }
          ] as ManualCaseOffence[]
        } as ManualCaseDefendant
      ];

      action = new StoreManualCaseDefendantsEitherWayOffences(mockDefendantsWithEitherWayOffences);

      const initialState = {
        defendants: [mockDefendantWithOffences]
      } as ManualCaseDetailsState;

      resultState = manualCaseDetailsReducer(initialState, action);
    });

    it('should update defendents first either way offences leaving second unchanged', () => {
      expect(resultState.defendants.length).toEqual(1);
      expect(resultState.defendants[0].offences.length).toEqual(2);
      expect(resultState.defendants[0].offences[0]).toEqual(mockDefendantsWithEitherWayOffences[0].offences[0]);
      expect(resultState.defendants[0].offences[1]).toEqual(mockDefendantWithOffences.offences[1]);
    });
  });
});
