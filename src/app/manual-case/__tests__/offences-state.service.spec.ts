import { TestBed } from '@angular/core/testing';
import { ManualCaseOffenceStateService } from '../offences-state.service';
import { ManualCaseDefendant } from '../../core/model';
import { ManualCaseOffence } from '../../core/model/manual-case-offence';
import { OffenceModeOfTrialType } from '../../core/model/reference-data-interfaces/offence-type';

describe('Manual Case Offence State Service', () => {
  let offenceStateService: ManualCaseOffenceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManualCaseOffenceStateService]
    });

    offenceStateService = TestBed.inject(ManualCaseOffenceStateService);
    offenceStateService.getUuid = jest.fn().mockReturnValue('uuid');
  });

  afterEach(() => {
    offenceStateService = undefined;
  });

  it('should load ZERO offences in memory and return blank offence object', () => {
    offenceStateService.initialise([]);
    const blankOffence = offenceStateService.load();

    expect(offenceStateService.counter).toEqual('1/1');
    expect(blankOffence.offenceId).toBeFalsy();
    expect(blankOffence.offenceWording).toBeFalsy();
    expect(blankOffence.offenceCode).toBeFalsy();
  });

  it('should load TWO defendants in memory and return defendant options for the checkbox ist', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      },
      {
        id: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            offenceCode: 'ZT88589B',
            offenceSequenceNumber: 2,
            offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
            offenceWording: 'Drunk Driving'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    offenceStateService.initialise(defendants);
    const defendantOptions = offenceStateService.getDefendantOptions('12af2be8-b257-4227-9cf0-3d77975ed7aa');

    expect(defendantOptions[0].label).toEqual('Defendant One');
    expect(defendantOptions[1].label).toEqual('Defendant Two');
  });

  it('should load THREE defendants in memory and get selected defendant Ids for a given offence', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      },
      {
        id: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            offenceCode: 'ZT88589B',
            offenceSequenceNumber: 2,
            offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
            offenceWording: 'Drunk Driving'
          }
        ]
      },
      {
        id: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Three'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    offenceStateService.initialise(defendants);
    const defendantOptions = offenceStateService.getSelectedDefendantIds('12af2be8-b257-4227-9cf0-3d77975ed7aa');

    const expectedIds = defendants.filter(d => d.id !== 'a87508c8-9180-488a-8ddc-9086df35a4a2').map(d => d.id);

    expect(defendantOptions).toEqual(expectedIds);
  });

  it('should load FOUR defendants in memory add ADD/UPDATE/ offence to the defendants', () => {
    const offence = {
      offenceCode: 'ZT88589B',
      offenceSequenceNumber: 2,
      offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
      offenceWording: 'Drunk Driving',
      defendantOptions: [
        {
          value: '46e1c5f5-5e91-4655-9eda-43368640f218',
          offence: {
            chargeDate: '2019-02-04',
            arrestDate: '2019-02-04'
          }
        },
        {
          value: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
          offence: {
            chargeDate: '2017-02-04',
            arrestDate: '2017-02-04'
          }
        },
        {
          value: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
          offence: {}
        },
        {
          value: '175d106a-4a20-493e-8e61-abdb2575772d',
          offence: {}
        }
      ]
    } as ManualCaseOffence;

    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        }
      },
      {
        id: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            offenceCode: 'ZT88589B',
            offenceSequenceNumber: 2,
            offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
            offenceWording: 'offence wording before update'
          }
        ]
      },
      {
        id: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Three'
          }
        }
      },
      {
        id: '175d106a-4a20-493e-8e61-abdb2575772d',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Four'
          }
        },
        offences: [
          {
            offenceCode: 'ZT88589B',
            offenceSequenceNumber: 2,
            offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
            offenceWording: 'should be deleted'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    offenceStateService.initialise(defendants);

    const selectedDefendantIds = [defendants[0].id, defendants[1].id];
    const updatedDefendants = offenceStateService.mapOffenceToDefendants(offence, defendants, selectedDefendantIds);

    const expectedOffence = {
      offenceCode: offence.offenceCode,
      offenceSequenceNumber: offence.offenceSequenceNumber,
      offenceId: offence.offenceId,
      offenceWording: offence.offenceWording
    };

    expect(updatedDefendants[0].offences[0]).toEqual({
      ...expectedOffence,
      ...{
        chargeDate: '2019-02-04',
        arrestDate: '2019-02-04'
      }
    });

    expect(updatedDefendants[1].offences[0]).toEqual({
      ...expectedOffence,
      ...{
        chargeDate: '2017-02-04',
        arrestDate: '2017-02-04'
      },
      offenceId: 'uuid'
    });
    expect(updatedDefendants[2].offences).toEqual([]);
    expect(updatedDefendants[3].offences).toEqual([]);
  });

  it('should load TWO defendants with offences in memory and navigate to next() and previous() offence', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      },
      {
        id: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            offenceCode: 'ZT88589B',
            offenceSequenceNumber: 2,
            offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
            offenceWording: 'Drunk Driving'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    offenceStateService.initialise(defendants);
    const firstOffence = offenceStateService.load();

    expect(offenceStateService.counter).toEqual('1/2');
    expect(firstOffence.offenceId).toEqual(defendants[0].offences[0].offenceId);
    expect(firstOffence.offenceWording).toEqual(defendants[0].offences[0].offenceWording);
    expect(firstOffence.offenceCode).toEqual(defendants[0].offences[0].offenceCode);

    const secondDefendant = offenceStateService.next();

    expect(offenceStateService.counter).toEqual('2/2');
    expect(secondDefendant.offenceId).toEqual(defendants[1].offences[0].offenceId);
    expect(secondDefendant.offenceWording).toEqual(defendants[1].offences[0].offenceWording);
    expect(secondDefendant.offenceCode).toEqual(defendants[1].offences[0].offenceCode);

    const prevDefendant = offenceStateService.previous();

    expect(offenceStateService.counter).toEqual('1/2');
    expect(prevDefendant.offenceId).toEqual(defendants[0].offences[0].offenceId);
    expect(prevDefendant.offenceWording).toEqual(defendants[0].offences[0].offenceWording);
    expect(prevDefendant.offenceCode).toEqual(defendants[0].offences[0].offenceCode);
  });

  it('should load ONE defendant with offences in memory return blank offence object when add another', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    offenceStateService.initialise(defendants);
    const blankOffence = offenceStateService.addNew();

    expect(offenceStateService.counter).toEqual('2/2');
    expect(blankOffence.offenceId).toBeFalsy();
    expect(blankOffence.offenceWording).toBeFalsy();
    expect(blankOffence.offenceCode).toBeFalsy();

    const firstOffence = offenceStateService.previous();

    expect(offenceStateService.counter).toEqual('1/1');
    expect(firstOffence.offenceId).toEqual(defendants[0].offences[0].offenceId);
    expect(firstOffence.offenceWording).toEqual(defendants[0].offences[0].offenceWording);
    expect(firstOffence.offenceCode).toEqual(defendants[0].offences[0].offenceCode);
  });

  it('should transform defendants` `either way` offences to be grouped by offence id', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone',
            modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
          },
          {
            offenceCode: 'MR73002',
            offenceSequenceNumber: 2,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Assault of a person',
            modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
          },
          {
            offenceCode: 'AT01020',
            offenceSequenceNumber: 3,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Controlled substance',
            modeOfTrialDerived: OffenceModeOfTrialType.Trial
          }
        ]
      },
      {
        id: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            offenceCode: 'ZT88589B',
            offenceSequenceNumber: 2,
            offenceId: 'c9cb0f24-ac3b-4a76-9c67-1320196daf79',
            offenceWording: 'Drunk Driving',
            modeOfTrialDerived: OffenceModeOfTrialType.Trial
          }
        ]
      }
    ] as ManualCaseDefendant[];

    const defendantsByOffenceCode = offenceStateService.getDefendantsGroupedByOffenceId(defendants, 'CO');

    expect(defendantsByOffenceCode).toMatchSnapshot();
  });

  it('should return true if some defendant offences are either way', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone',
            modeOfTrialDerived: OffenceModeOfTrialType.Trial
          },
          {
            offenceCode: 'RT88584C',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7ca',
            offenceWording: 'Caught Driving On Phone',
            modeOfTrialDerived: OffenceModeOfTrialType.EitherWay
          }
        ]
      }
    ] as ManualCaseDefendant[];

    expect(offenceStateService.hasEitherWayOffence(defendants)).toEqual(true);
  });

  it('should return false if no defendant offences are either way', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            title: 'Mr',
            firstName: 'Defendant',
            lastName: 'One'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            offenceSequenceNumber: 1,
            offenceId: '12af2be8-b257-4227-9cf0-3d77975ed7aa',
            offenceWording: 'Caught Driving On Phone',
            modeOfTrialDerived: OffenceModeOfTrialType.Trial
          }
        ]
      }
    ] as ManualCaseDefendant[];

    expect(offenceStateService.hasEitherWayOffence(defendants)).toEqual(false);
  });
});
