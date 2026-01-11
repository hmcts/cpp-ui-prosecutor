import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ManualCaseDefendant } from '../../../core/model';
import { ManualCaseDefendantComponent } from '../manual-case-defendant.component';
import { ManualCaseDefendantStateService } from '../../defendants-state.service';
import { ManualCase } from '../../../core/model/manual-case';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';

const emptyDefendant = {
  id: '',
  individual: {
    personalInformation: {
      contactDetails: {},
      address: {
        address1: ''
      }
    }
  }
};

const manualCaseDefendants = [
  {
    organisationName: 'Amazon',
    address: {
      address1: '14 Bath Road'
    },
    emailAddress1: 'ben@abc.com',
    telephoneNumberBusiness: '07966666666',
    documentationLanguage: 'ENGLISH',
    hearingLanguage: 'WELSH'
  }
] as ManualCaseDefendant[];

const manualCaseDetailMock = {
  caseId: 'case-id-mock',
  prosecutor: {
    prosecutionAuthorityId: 'prosecutionAuthorityId-1',
    prosecutingAuthority: 'Derbyshire Police'
  }
} as ManualCase;

const prosecutorsMock = [
  {
    id: 'prosecutionAuthorityId-1',
    policeFlag: true
  },
  {
    id: 'prosecutionAuthorityId-2',
    policeFlag: false
  }
];

describe('Manual Case Defendant Component', () => {
  window.scroll = jest.fn();

  let fixture: ComponentFixture<TestManualCaseDefendantComponent>;
  let component: ManualCaseDefendantComponent;

  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');

  beforeEach(() => {
    const mockDefendantStateService = {
      initialise: jest.fn(),
      load: jest.fn(() => manualCaseDefendants[0]),
      previous: jest.fn(() => manualCaseDefendants[0]),
      addNew: jest.fn(() => emptyDefendant),
      next: jest.fn(() => null),
      iterateDefendant: false,
      counter: '1'
    };

    const mockLocation = {
      back: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [TestManualCaseDefendantComponent, ManualCaseDefendantComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {}
        }),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        }),
        {
          provide: Location,
          useValue: mockLocation
        },
        {
          provide: ManualCaseDefendantStateService,
          useValue: mockDefendantStateService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestManualCaseDefendantComponent);
    component = fixture.debugElement.query(By.directive(ManualCaseDefendantComponent)).componentInstance;
  });

  it('should render the component for the Ist defendant from the list', () => {
    fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
    fixture.componentInstance.manualCaseType = 'Q';
    fixture.componentInstance.manualCaseDetail = manualCaseDetailMock;
    fixture.componentInstance.prosecutors = prosecutorsMock;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
    expect(component.defendantType).toEqual('ORGANISATION');
    expect(component.editDefendant.organisationName).toEqual(manualCaseDefendants[0].organisationName);
  });

  it('should call submitData() to add a new defendant and do not navigate to the next page', () => {
    fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
    fixture.componentInstance.manualCaseType = 'Q';
    fixture.componentInstance.manualCaseDetail = manualCaseDetailMock;
    fixture.componentInstance.prosecutors = prosecutorsMock;
    fixture.detectChanges();

    const formData = {
      action: 'add',
      defendantToStore: { id: 'def-id-001' }
    };

    component.submitData(formData);

    expect(component.defendantType).toEqual('INDIVIDUAL');
    expect(component.editDefendant.id).toEqual('');
    expect(component.errors).toBeFalsy();
    expect(fixture.componentInstance.handleFormSubmit).toHaveBeenCalledWith({
      navigateToNextPage: false,
      defendantToStore: formData.defendantToStore
    });
  });

  it('should call submitData() to post the defendant and continue navigating to the next page', () => {
    fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
    fixture.componentInstance.manualCaseType = 'Q';
    fixture.componentInstance.manualCaseDetail = manualCaseDetailMock;
    fixture.componentInstance.prosecutors = prosecutorsMock;
    fixture.detectChanges();

    const formData = {
      action: 'continue',
      defendantToStore: { id: 'def-id-001' }
    };

    component.submitData(formData);

    expect(component.editDefendant).toBeNull();
    expect(fixture.componentInstance.handleFormSubmit).toHaveBeenCalledWith({
      navigateToNextPage: true,
      defendantToStore: formData.defendantToStore
    });
  });

  it('should call back() load the previous defendant from the in memory list of defendant', () => {
    fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
    fixture.componentInstance.manualCaseType = 'Q';
    fixture.componentInstance.manualCaseDetail = manualCaseDetailMock;
    fixture.componentInstance.prosecutors = prosecutorsMock;
    fixture.detectChanges();

    component.back();

    expect(component.defendantType).toEqual('ORGANISATION');
    expect(component.editDefendant.organisationName).toEqual(manualCaseDefendants[0].organisationName);
  });

  it('should render the component for SJP case and legal entity defendant', () => {
    fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
    fixture.componentInstance.manualCaseType = 'J';
    fixture.componentInstance.manualCaseDetail = manualCaseDetailMock;
    fixture.componentInstance.prosecutors = prosecutorsMock;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
    expect(component.defendantType).toEqual('ORGANISATION');
    expect(component.editDefendant.organisationName).toEqual(manualCaseDefendants[0].organisationName);
  });

  describe('#isPoliceProsecutor', () => {
    it('should return true if case prosecutor is police', () => {
      fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
      fixture.componentInstance.manualCaseType = 'Q';
      fixture.componentInstance.manualCaseDetail = manualCaseDetailMock;
      fixture.componentInstance.prosecutors = prosecutorsMock;
      fixture.detectChanges();

      expect(component.isPoliceProsecutor()).toEqual(true);
    });

    it('should return false if prosecutor is not police', () => {
      const manualCaseDetailMockWithNoPolice = {
        caseId: 'case-id-mock',
        prosecutor: {
          prosecutionAuthorityId: 'prosecutionAuthorityId-2',
          prosecutingAuthority: 'TVL'
        }
      } as ManualCase;

      fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
      fixture.componentInstance.manualCaseType = 'Q';
      fixture.componentInstance.manualCaseDetail = manualCaseDetailMockWithNoPolice;
      fixture.componentInstance.prosecutors = prosecutorsMock;
      fixture.detectChanges();

      expect(component.isPoliceProsecutor()).toEqual(false);
    });

    it('should return false if no prosecutor exist', () => {
      const manualCaseDetailMockWithNoProsecutor = {
        ...manualCaseDetailMock,
        prosecutor: null
      };

      fixture.componentInstance.manualCaseDefendants = manualCaseDefendants;
      fixture.componentInstance.manualCaseType = 'Q';
      fixture.componentInstance.manualCaseDetail = manualCaseDetailMockWithNoProsecutor;
      fixture.componentInstance.prosecutors = prosecutorsMock;
      fixture.detectChanges();

      expect(component.isPoliceProsecutor()).toEqual(false);
    });
  });

  @Component({
    selector: 'manual-case-defendant-test',
    template: `
      <manual-case-defendant
        [manualCaseDefendants]="manualCaseDefendants"
        [manualCaseDetail]="manualCaseDetail"
        [manualCaseType]="manualCaseType"
        [prosecutors]="prosecutors"
        (submitFormData)="handleFormSubmit($event)"
      >
      </manual-case-defendant>
    `,
    imports: [ManualCaseDefendantComponent]
  })
  class TestManualCaseDefendantComponent {
    manualCaseDefendants: ManualCaseDefendant[];
    manualCaseType: string;
    manualCaseDetail: ManualCase;
    prosecutors: any[];
    handleFormSubmit = jest.fn();
  }
});
