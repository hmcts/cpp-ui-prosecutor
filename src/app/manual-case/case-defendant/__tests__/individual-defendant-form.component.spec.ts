import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualDefendantFormComponent } from '../individual-defendant-form.component';
import { ManualCaseDefendant } from '../../../core';
import cleanDeep from 'clean-deep';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideTranslateService } from '@ngx-translate/core';

const remandStatuses = [
  {
    id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
    seqNo: 10,
    statusCode: 'B',
    statusDescription: 'Conditional Bail'
  },
  {
    id: 'eaf18bf8-9569-3656-a4ab-64299f9bd513',
    seqNo: 20,
    statusCode: 'U',
    statusDescription: 'Unconditional Bail',
    hasConditions: true
  },
  {
    id: '12e69486-4d01-3403-a50a-7419ca040635',
    seqNo: 30,
    statusCode: 'C',
    statusDescription: 'Remanded into Custody'
  },
  {
    id: '86009c70-759d-3308-8de4-194886ff9a77',
    seqNo: 40,
    statusCode: 'A',
    statusDescription: 'Not applicable'
  },
  {
    id: '4dc146db-9d89-30bf-93b3-b22bc072d666',
    seqNo: 50,
    statusCode: 'L',
    statusDescription: 'Remanded into care of Local Authority'
  },
  {
    id: '34443c87-fa6f-34c0-897f-0cce45773df5',
    seqNo: 60,
    statusCode: 'P',
    statusDescription: 'Conditional Bail with Pre-Release conditions'
  },
  {
    id: '549336f9-2a07-3767-960f-107da761a698',
    seqNo: 70,
    statusCode: 'S',
    statusDescription: 'Remanded into Secure Accommodation'
  }
];

const manualCaseDefendant = {
  individual: {
    personalInformation: {
      contactDetails: {
        primaryEmail: 'one@abc.com',
        home: '07968111111',
        work: undefined
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
    parentGuardianInformation: {
      personalInformation: {
        lastName: 'Guardian One'
      },
      gender: 'NOT_SPECIFIED',
      organisationName: 'Guardian Organisation ABC',
      address: {
        address1: '14 Abc Road',
        address2: 'London',
        address3: '',
        address4: '',
        address5: '',
        postcode: 'SL9 5ZZ'
      },
      emailAddress1: 'ben@abc.com',
      telephoneNumberBusiness: '07966666666'
    },
    selfDefinedInformation: {
      dateOfBirth: '1975-01-01',
      nationality: ''
    },
    bailConditions: 'Conditional Bail Description',
    custodyStatus: 'B'
  },
  numPreviousConvictions: 1,
  documentationLanguage: 'ENGLISH',
  hearingLanguage: 'WELSH'
} as ManualCaseDefendant;

@Component({
  selector: 'nationality-auto-suggest',
  template: `
    <div></div>
  `
})
class MockNationalityAutoSuggestComponent {
  @Input() value: string;
  @Input() suggestionKey: string;
  @Input() mapSelectionToKey: boolean;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'ethnicity-auto-suggest',
  template: `
    <div></div>
  `
})
class MockEthnicityAutoSuggestComponent {
  @Input() value: string;
  @Input() suggestionKey: string;
  @Input() mapSelectionToKey: boolean;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'ethnicity-code-auto-suggest',
  template: `
    <div></div>
  `
})
class MockEthnicityCodeAutoSuggestComponent {
  @Input() value: string;
  @Input() suggestionKey: string;
  @Input() mapSelectionToKey: boolean;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'test-input-address',
  template: `
    <div></div>
  `
})
class MockAddressInputComponent {
  @Input() address: any;
  @Input() isRequired: boolean;
  @Input() id: string;
  @Input() ariaDescribedBy: string | null;
  @Input() maxLength?: number;
  @Input() showFixedAbode = false;
  @Input() validWhenEmpty = true;
  @Input() customErrorMessage?: string;
  @Input() validatedFormElements?: string[];
  @Input() labelWithOptionalText?: string[];
  @Output() addressChange = new EventEmitter<any>();
}

@Component({
  selector: 'individual-defendant-guardian',
  template: `
    <div></div>
  `
})
class MockIndividualDefendantGuardianComponent {
  @Input() manualCaseDefendant: ManualCaseDefendant;
  @Input() manualCaseType: string;
}

describe('Individual Defendant Form Component', () => {
  let component: IndividualDefendantFormComponent;
  let fixture: ComponentFixture<IndividualDefendantFormComponent>;
  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore(),
        provideRouter([]),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        }),
        { provide: Store, useValue: { pipe: () => of({}) } }
      ],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(IndividualDefendantFormComponent, {
      remove: {
        imports: []
      },
      add: {
        imports: [
          MockNationalityAutoSuggestComponent,
          MockEthnicityAutoSuggestComponent,
          MockEthnicityCodeAutoSuggestComponent,
          MockAddressInputComponent,
          MockIndividualDefendantGuardianComponent
        ]
      }
    });

    fixture = TestBed.createComponent(IndividualDefendantFormComponent);
    component = fixture.componentInstance;
    component.getUuid = generateUUID;
    // Spy on EventEmitter methods
    jest.spyOn(component.formSubmit, 'emit');
    jest.spyOn(component.formError, 'emit');
    jest.spyOn(component.goBack, 'emit');
  });

  function setupComponent(defendant: ManualCaseDefendant, caseType: string) {
    fixture.componentRef.setInput('manualCaseDefendant', defendant);
    fixture.componentRef.setInput('manualCaseType', caseType);
    fixture.componentRef.setInput('remandStatuses', remandStatuses);
    fixture.componentRef.setInput('aliasesReset', true);
    fixture.componentRef.setInput('showAddButton', true);
    fixture.detectChanges();
  }

  it('should render the component correctly when case type is SJP', () => {
    setupComponent(manualCaseDefendant, 'J');

    const addButton = fixture.nativeElement.querySelector(`button[data-role='add']`);
    expect(addButton).toBeNull();
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit valid defendant form with individual as guardian', () => {
    const defendant = { ...manualCaseDefendant };
    defendant.individual.guardianType = 'INDIVIDUAL';
    setupComponent(defendant, 'J');

    const continueButton = fixture.nativeElement.querySelector(`button[data-role='continue']`);
    continueButton.click();

    defendant.id = 'uuid-001';
    delete defendant.individual.guardianType;
    delete defendant.individual.parentGuardianInformation.organisationName;
    delete defendant.individual.parentGuardianInformation.address;
    delete defendant.individual.parentGuardianInformation.companyTelephoneNumber;

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      action: 'continue',
      defendantToStore: cleanDeep(defendant)
    });
  });

  it('should submit valid defendant form with organisation as guardian', () => {
    const defendant = { ...manualCaseDefendant };
    defendant.individual.guardianType = 'ORGANISATION';
    setupComponent(defendant, 'J');

    const continueButton = fixture.nativeElement.querySelector(`button[data-role='continue']`);
    continueButton.click();

    defendant.id = 'uuid-001';
    delete defendant.individual.guardianType;
    delete defendant.individual.parentGuardianInformation.personalInformation;
    delete defendant.individual.parentGuardianInformation.gender;

    expect(component.formSubmit.emit).toHaveBeenCalledWith({
      action: 'continue',
      defendantToStore: cleanDeep(defendant)
    });
  });

  it('should submit empty form trigger form error event', async () => {
    const emptyModel = {
      individual: {
        personalInformation: {
          contactDetails: {},
          address: {}
        },
        selfDefinedInformation: {}
      }
    } as ManualCaseDefendant;

    setupComponent(emptyModel, 'J');
    const continueButton = fixture.nativeElement.querySelector(`button[data-role='continue']`);
    continueButton.click();

    await fixture.whenStable();
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.formError.emit).toHaveBeenCalled();
  });

  it('should trigger onBack event', () => {
    setupComponent(manualCaseDefendant, 'J');

    const backButton = fixture.nativeElement.querySelector('a:last-child');
    backButton.click();

    expect(component.goBack.emit).toHaveBeenCalled();
  });
});
