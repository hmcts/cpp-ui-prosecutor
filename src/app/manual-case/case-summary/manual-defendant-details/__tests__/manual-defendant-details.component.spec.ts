import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefendantDetailsComponent } from '../manual-defendant-details.component';
import { ControlContainer, NgForm } from '@angular/forms';
import { Language, ManualCaseDefendant } from '../../../../core/model';
import { ManualCaseDefendantStateService } from '../../../defendants-state.service';

import { Ethnicity, EthnicityCode } from '../../../../core/model/reference-data-interfaces';
import { provideTranslateService } from '@ngx-translate/core';

const mockDefendants = [
  {
    id: '12613fbc-e0c2-429e-836a-bedcfc0bcb47',
    individual: {
      personalInformation: {
        observedEthnicity: 2,
        contactDetails: {
          primaryEmail: 'one@abc.com',
          home: '07968111111'
        },
        address: {
          address1: '11 Wilton Road',
          address2: 'Eastfield',
          address3: 'Peterborough',
          address4: '',
          address5: '',
          postcode: 'PE1 5ZZ'
        },
        title: 'Mr',
        firstName: 'Defendant',
        lastName: 'One'
      },
      selfDefinedInformation: {
        dateOfBirth: '1975-01-01',
        ethnicity: 'W1',
        ethnicityId: 'ethId'
      },
      custodyStatus: 'On conditional bail',
      bailConditions: 'bail condition 1',
      parentGuardianInformation: {
        personalInformation: {
          contactDetails: {
            primaryEmail: 'guardian@abc.com',
            home: '07968111122'
          },
          address: {
            address1: '11 Wilton Road',
            address2: 'Eastfield',
            address3: 'Peterborough',
            address4: '',
            address5: '',
            postcode: 'PE1 5ZZ'
          },
          title: 'Mr',
          firstName: 'Defendant',
          lastName: 'Guardian'
        }
      }
    },
    numPreviousConvictions: 1,
    documentationLanguage: 'ENGLISH' as Language,
    hearingLanguage: 'WELSH' as Language
  },
  {
    id: '46e1c5f5-5e91-4655-9eda-43368640f218',
    individual: {
      personalInformation: {
        contactDetails: {
          primaryEmail: 'two@abc.com',
          home: '07968222222'
        },
        address: {
          address1: 'No fixed abode',
          address2: '',
          address3: '',
          address4: '',
          address5: '',
          postcode: ''
        },
        title: 'Mr',
        firstName: 'Defendant',
        lastName: 'Two'
      },
      selfDefinedInformation: {
        dateOfBirth: '1970-02-02'
      }
    },
    numPreviousConvictions: 2,
    documentationLanguage: 'ENGLISH' as Language,
    hearingLanguage: 'WELSH' as Language,
    individualAliases: [
      {
        title: 'Mr',
        firstName: 'James',
        givenName2: 'Terrance',
        lastName: 'Wilson'
      },
      {
        title: 'Sir',
        firstName: 'James',
        givenName2: 'Terrance',
        lastName: 'Wilson'
      }
    ]
  },
  {
    id: '46e1c5f5-5e91-4655-9eda-43368640f218',
    individual: {
      parentGuardianInformation: {
        organisationName: 'organisation'
      }
    },
    aliasForCorporate: [
      {
        aliasForCorporate: 'alias 1'
      },
      {
        aliasForCorporate: 'alias 2'
      }
    ],
    documentationLanguage: 'ENGLISH' as Language,
    hearingLanguage: 'WELSH' as Language
  }
] as any[];

const mockNationalities = [
  {
    id: 'b889dbc6-9805-4535-97bd-56737f928fba',
    cjsCode: 12,
    isoCode: 'ALB',
    govCode: 'AL',
    countryName: 'Albania',
    nationality: 'Albanian'
  },
  {
    id: '51f09da0-be51-41be-8fe8-407a491e04e1',
    cjsCode: 96,
    isoCode: 'CHL',
    govCode: 'CL',
    countryName: 'Chile',
    nationality: 'Chilean'
  }
];

const mockRemandStatuses = [
  {
    id: 'mock-id-1',
    seqNo: 10,
    statusCode: 'B',
    statusDescription: 'Conditional Bail'
  },
  {
    id: 'mock-id-2',
    seqNo: 30,
    statusCode: 'C',
    statusDescription: 'Remanded into Custody'
  },
  {
    id: 'mock-id-3',
    seqNo: 40,
    statusCode: 'A',
    statusDescription: 'Not applicable'
  }
];

const mockEthnicities = [{ code: 'W1', id: 'ethId', description: 'British' }] as Ethnicity[];

const mockObservedEthnicities = [
  { ethnicityCode: '2', ethnicityDescription: 'White - South European' }
] as EthnicityCode[];

describe('DefendantDetailsComponent', () => {
  let component: DefendantDetailsComponent;
  let fixture: ComponentFixture<DefendantDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DefendantDetailsComponent],
      providers: [
        ControlContainer,
        NgForm,
        ManualCaseDefendantStateService,
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(DefendantDetailsComponent);
    component = fixture.componentInstance;
    component.defendants = mockDefendants;
    component.nationalities = mockNationalities;
    component.remandStatuses = mockRemandStatuses;
    component.ethnicities = mockEthnicities;
    component.observedEthnicities = mockObservedEthnicities;
    jest.spyOn(component, 'createUUID').mockReturnValue('--mock-id--');
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component when case is SJP and legal entity defendant', () => {
    component.caseInitiationCode = 'J';
    component.defendants = [
      {
        id: 'e58b977c-b3bd-478c-a46a-91e59eb756a8',
        address: {
          address1: '123',
          postcode: 'cr0 1xx'
        },
        documentationLanguage: 'ENGLISH' as Language,
        hearingLanguage: 'ENGLISH' as Language,
        organisationName: 'Organisation Name',
        appliedProsecutorCosts: 1000,
        postingDate: '2020-12-12',
        numPreviousConvictions: 10
      }
    ] as ManualCaseDefendant[];
    expect(fixture).toMatchSnapshot();
  });

  it(`getPersonFull name should return a person's full name in expected format`, () => {
    expect(component.getPersonFullName(mockDefendants[0].individual.personalInformation)).toEqual('Mr Defendant ONE');
  });

  it('getIndividualAliases should return expected individual aliases in expected format', () => {
    expect(component.getIndividualAliases(1)).toEqual(['Mr James Terrance WILSON', 'Sir James Terrance WILSON']);
  });

  it('guardianIsIndividual should return true when guardian information has no organisation name', () => {
    expect(component.guardianIsIndividual(mockDefendants[0])).toBeTruthy();
  });

  it('guardianIsIndividual should return false when guardian information has organisation name', () => {
    expect(component.guardianIsIndividual(mockDefendants[2])).toBeFalsy();
  });

  it('getOrganisationAliases should return expected organisation aliases', () => {
    expect(component.getOrganisationAliases(2)).toEqual(['alias 1', 'alias 2']);
  });

  it('getNationalityName should return expected nationality name', () => {
    expect(component.getNationalityName('CHL')).toEqual('Chilean');
  });

  it('getRemandStatus should return expected nationality name', () => {
    expect(component.getRemandStatus('B')).toEqual('Conditional Bail');
  });

  it('getEthnicityName should return expected Ethnicity name', () => {
    expect(component.getEthnicityName('W1')).toEqual('British');
  });

  it('getRemandStatus should return expected ObservedEthnicity name', () => {
    expect(component.getObservedEthnicityName(2)).toEqual('White - South European');
  });

  it('getOnlineConvictionForCase should return online conviction flag as YES', () => {
    const defendant = { offences: [{ prosecutorOfferAOCP: true }] };
    expect(component.getOnlineConvictionForCase(defendant)).toBe('Yes');
  });

  it('getOnlineConvictionForCase should return online conviction flag as NO', () => {
    const defendant = {
      offences: [{ prosecutorOfferAOCP: true }, { prosecutorOfferAOCP: true }, { prosecutorOfferAOCP: false }]
    };
    expect(component.getOnlineConvictionForCase(defendant)).toBe('No');
  });

  it('getAllOffenceAocpEligible should return boolean if it is eligible', () => {
    const defendant = {
      offences: [{ aocpEligible: true }, { aocpEligible: false }, { aocpEligible: false }]
    };
    expect(component.getAllOffenceAocpEligible(defendant)).toBe(true);
  });

  it('should emit expected add defendant path', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith('defendant');
  });

  it('should emit edit defendant path', () => {
    spyOn(component.edit, 'emit');
    component.onEdit(1);
    expect(component.edit.emit).toHaveBeenCalledWith('edit-defendant');
  });

  it('should emit remove defendant path', () => {
    spyOn(component.remove, 'emit');
    component.onRemove(1);
    expect(component.remove.emit).toHaveBeenCalledWith({
      defendantId: '46e1c5f5-5e91-4655-9eda-43368640f218'
    });
  });

  it('should return true or false based on case InitiationCode', () => {
    component.caseInitiationCode = 'J';
    expect(component.isSJP()).toBeTruthy();

    component.caseInitiationCode = 'T';
    expect(component.isTrial()).toBeTruthy();
    expect(component.isTrialOrSentence()).toBeTruthy();
    expect(component.isChargeTrialOrSentence()).toBeTruthy();

    component.caseInitiationCode = 'CO';
    expect(component.isTrial()).toBeFalsy();
    expect(component.isTrialOrSentence()).toBeTruthy();
    expect(component.isChargeTrialOrSentence()).toBeTruthy();

    component.caseInitiationCode = 'C';
    expect(component.isTrial()).toBeFalsy();
    expect(component.isTrialOrSentence()).toBeFalsy();
    expect(component.isChargeTrialOrSentence()).toBeTruthy();
  });
});
