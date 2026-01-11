import { TestBed } from '@angular/core/testing';
import { ManualCaseDefendantStateService } from '../defendants-state.service';
import { ManualCaseDefendant } from '../../core/model';

describe('Manual Case Defendant State Service', () => {
  let defendantStateService: ManualCaseDefendantStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManualCaseDefendantStateService]
    });

    defendantStateService = TestBed.inject(ManualCaseDefendantStateService);
  });

  afterEach(() => {
    defendantStateService = undefined;
  });

  it('should load() 0 defendants in memory return blank defendant object', () => {
    defendantStateService.initialise([]);
    const blankDefendant = defendantStateService.load();

    expect(defendantStateService.counter).toEqual('1/1');
    expect(blankDefendant.id).toEqual('');
    expect(blankDefendant.individual.personalInformation.lastName).toBeFalsy();
    expect(blankDefendant.individual.personalInformation.address.address1).toBeFalsy();
  });

  it('should load() 2 defendants in memory and navigate to next() and previous() defendant', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            contactDetails: {
              primaryEmail: 'ben@abc.com',
              home: '07968222222'
            },
            address: {
              address1: '22 Gervaise Close',
              address2: 'Cippenjam',
              address3: 'Slough',
              address4: '',
              address5: '',
              postcode: 'SL1 5ZZ'
            },
            title: 'Mr',
            firstName: 'Ben',
            lastName: 'Joyce'
          },
          selfDefinedInformation: {
            dateOfBirth: '1970-02-02'
          }
        },
        numPreviousConvictions: 2,
        documentationLanguage: 'ENGLISH',
        hearingLanguage: 'WELSH'
      },
      {
        id: 'a87508c8-9180-488a-8ddc-9086df35a4a2',
        individual: {
          personalInformation: {
            contactDetails: {
              primaryEmail: 'darren@abc.com',
              home: '07968333333'
            },
            address: {
              address1: '33 Talford Drive',
              address2: 'Houndsmill',
              address3: 'Basingstoke',
              address4: '',
              address5: '',
              postcode: 'RG21 6ZZ'
            },
            title: 'Mr',
            firstName: 'Darren',
            lastName: 'Smith'
          },
          selfDefinedInformation: {
            dateOfBirth: '1980-03-03'
          }
        },
        numPreviousConvictions: 3,
        documentationLanguage: 'WELSH',
        hearingLanguage: 'ENGLISH'
      }
    ] as ManualCaseDefendant[];

    defendantStateService.initialise(defendants);
    const firstDefendant = defendantStateService.load();

    expect(defendantStateService.counter).toEqual('1/2');
    expect(firstDefendant.id).toEqual(defendants[0].id);
    expect(firstDefendant.individual.personalInformation.lastName).toEqual(
      defendants[0].individual.personalInformation.lastName
    );

    const secondDefendant = defendantStateService.next();

    expect(defendantStateService.counter).toEqual('2/2');
    expect(secondDefendant.id).toEqual(defendants[1].id);
    expect(secondDefendant.individual.personalInformation.lastName).toEqual(
      defendants[1].individual.personalInformation.lastName
    );

    const lastDefendant = defendantStateService.previous();

    expect(defendantStateService.counter).toEqual('1/2');
    expect(lastDefendant.id).toEqual(defendants[0].id);
    expect(lastDefendant.individual.personalInformation.lastName).toEqual(
      defendants[0].individual.personalInformation.lastName
    );
  });

  it('should load() 1 defendants in memory return blank defendant object', () => {
    const defendants = [
      {
        id: '46e1c5f5-5e91-4655-9eda-43368640f218',
        individual: {
          personalInformation: {
            contactDetails: {
              primaryEmail: 'ben@abc.com',
              home: '07968222222'
            },
            address: {
              address1: '22 Gervaise Close',
              address2: 'Cippenjam',
              address3: 'Slough',
              address4: '',
              address5: '',
              postcode: 'SL1 5ZZ'
            },
            title: 'Mr',
            firstName: 'Ben',
            lastName: 'Joyce'
          },
          selfDefinedInformation: {
            dateOfBirth: '1970-02-02'
          }
        },
        numPreviousConvictions: 2,
        documentationLanguage: 'ENGLISH',
        hearingLanguage: 'WELSH'
      }
    ] as ManualCaseDefendant[];

    defendantStateService.initialise(defendants);
    const blankDefendant = defendantStateService.addNew();

    expect(defendantStateService.counter).toEqual('2/2');
    expect(blankDefendant.id).toEqual('');
    expect(blankDefendant.individual.personalInformation.address.address1).toBeFalsy();

    const firstDefendant = defendantStateService.previous();

    expect(defendantStateService.counter).toEqual('1/1');
    expect(firstDefendant.id).toEqual(defendants[0].id);
    expect(firstDefendant.individual.personalInformation.lastName).toEqual(
      defendants[0].individual.personalInformation.lastName
    );
  });
});
