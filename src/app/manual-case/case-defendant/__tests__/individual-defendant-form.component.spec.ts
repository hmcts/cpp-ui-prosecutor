import { Shallow } from 'shallow-render';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdkCoreModule, PdkDateInputModule, PdkInsetTextModule, PdkFormModule, PdkRadioInputModule } from '@cpp/pdk';
import { ManualCaseModule } from '../../manual-case.module';
import { IndividualDefendantFormComponent } from '../individual-defendant-form.component';
import { ManualCaseDefendant } from '../../../core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared';
import cleanDeep from 'clean-deep';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

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

describe('Individual Defendant Form Component', () => {
  let component: Shallow<IndividualDefendantFormComponent>;
  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');
  Shallow.alwaysReplaceModule(RouterModule, RouterTestingModule);

  beforeEach(() => {
    component = new Shallow(IndividualDefendantFormComponent, ManualCaseModule)
      .dontMock(
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        PdkRadioInputModule,
        PdkInsetTextModule,
        PdkCoreModule,
        PdkFormModule,
        PdkDateInputModule
      )
      .provide([Store])
      .mock(Store, { pipe: () => of({}) });
  });

  async function renderComponent(defendant, caseType) {
    return component.render(
      `<individual-defendant-form
            [manualCaseDefendant]="manualCaseDefendant"
            [manualCaseType]="manualCaseType"
            [remandStatuses]="remandStatuses"
            [aliasesReset]="true"
            [showAddButton]="true"
            (formSubmit)="handleFormSubmit($event)"
            (formError)="handleFormError($event)"
            (goBack)="handleFormBack($event)">
       </individual-defendant-form>`,
      {
        bind: {
          manualCaseDefendant: defendant,
          manualCaseType: caseType,
          remandStatuses,
          handleFormSubmit: () => jest.fn(),
          handleFormError: () => jest.fn(),
          handleFormBack: () => jest.fn()
        }
      }
    );
  }

  it('should render the component correctly when case type is SJP', async () => {
    const { fixture, find, instance } = await renderComponent(manualCaseDefendant, 'J');

    expect(find(`button[data-role='add']`)).toHaveLength(0);
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit valid defendant form with individual as guardian', async () => {
    manualCaseDefendant.individual.guardianType = 'INDIVIDUAL';
    const { find, bindings, instance } = await renderComponent(manualCaseDefendant, 'J');

    const continueButton = find(`button[data-role='continue']`);

    instance.getUuid = generateUUID;

    continueButton.nativeElement.click();

    manualCaseDefendant.id = 'uuid-001';

    delete manualCaseDefendant.individual.guardianType;
    delete manualCaseDefendant.individual.parentGuardianInformation.organisationName;
    delete manualCaseDefendant.individual.parentGuardianInformation.address;
    delete manualCaseDefendant.individual.parentGuardianInformation.companyTelephoneNumber;

    expect(bindings.handleFormSubmit).toHaveBeenCalledWith({
      action: 'continue',
      defendantToStore: cleanDeep(manualCaseDefendant)
    });
  });

  it('should submit valid defendant form with organisation as guardian', async () => {
    manualCaseDefendant.individual.guardianType = 'ORGANISATION';
    const { find, bindings, instance } = await renderComponent(manualCaseDefendant, 'J');

    const continueButton = find(`button[data-role='continue']`);

    instance.getUuid = generateUUID;

    continueButton.nativeElement.click();

    manualCaseDefendant.id = 'uuid-001';

    delete manualCaseDefendant.individual.guardianType;
    delete manualCaseDefendant.individual.parentGuardianInformation.personalInformation;
    delete manualCaseDefendant.individual.parentGuardianInformation.gender;

    expect(bindings.handleFormSubmit).toHaveBeenCalledWith({
      action: 'continue',
      defendantToStore: cleanDeep(manualCaseDefendant)
    });
  });

  it('should submit empty form trigger form error event', async () => {
    jest.useFakeTimers();

    const emptyModel = {
      individual: {
        personalInformation: {
          contactDetails: {},
          address: {}
        },
        selfDefinedInformation: {}
      }
    };

    const { find, bindings, fixture } = await renderComponent(emptyModel, 'J');
    const continueButton = find(`button[data-role='continue']`);
    continueButton.nativeElement.click();
    await fixture.whenStable();
    fixture.detectChanges();

    jest.runAllTimers(); // the pdk emits errors in a setTimeout function, we need to mock this to avoid race conditions

    await fixture.whenStable();
    fixture.detectChanges();

    Promise.resolve(true).then(result => {
      expect(bindings.handleFormError).toHaveBeenCalled();
    });
  });

  it('should trigger onBack event', async () => {
    const { find, bindings } = await renderComponent(manualCaseDefendant, 'J');

    const backButton = find('a:last-child');
    backButton.nativeElement.click();

    expect(bindings.handleFormBack).toHaveBeenCalled();
  });
});
