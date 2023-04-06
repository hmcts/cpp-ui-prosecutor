import { Shallow } from 'shallow-render';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PdkCoreModule,
  PdkFormModule,
  PdkRadioInputModule,
  PdkInsetTextModule,
  PdkTextareaModule,
  PdkInputModule,
  PdkDateInputModule
} from '@cpp/pdk';

import { ManualCaseModule } from '../../manual-case.module';
import { OrganisationDefendantFormComponent } from '../organisation-defendant-form.component';
import { ManualCaseDefendant } from '../../../core/model/manual-case-defendant';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
      getPropertyValue: (prop) => {
          return '';
      }
  })
});

const manualCaseDefendantMock = {
  organisationName: 'Amazon',
  address: {
    address1: '14 Bath Road',
    address2: 'Langley',
    address3: '',
    address4: '',
    address5: '',
    postcode: 'SL1 5ZZ',
  },
  emailAddress1: 'ben@abc.com',
  telephoneNumberBusiness: '07966666666',
  documentationLanguage: 'ENGLISH',
  hearingLanguage: 'WELSH',
  numPreviousConvictions: 10,
  asn: '3',
} as ManualCaseDefendant;

describe('Organisation Defendant Form Component', () => {
  let component: Shallow<OrganisationDefendantFormComponent>;

  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');

  beforeEach(() => {
    component = new Shallow(OrganisationDefendantFormComponent, ManualCaseModule).dontMock(
      CommonModule,
      SharedModule,
      FormsModule,
      PdkFormModule,
      ReactiveFormsModule,
      PdkInputModule,
      PdkRadioInputModule,
      PdkInsetTextModule,
      PdkCoreModule,
      PdkDateInputModule,
      PdkTextareaModule
    );
  });

  function renderComponent(manualCaseDefendant, manualCaseType, isPoliceProsecutor) {
    return component.render(
      `<organisation-defendant-form
            [manualCaseDefendant]="manualCaseDefendant"
            [manualCaseType]="manualCaseType"
            [showAddButton]="true"
            [isPoliceProsecutor]="isPoliceProsecutor"
            (onSubmit)="handleFormSubmit($event)"
            (onError)="handleFormError($event)"
            (onBack)="handleFormBack($event)">
       </organisation-defendant-form>`,
      {
        bind: {
          manualCaseDefendant,
          manualCaseType,
          isPoliceProsecutor,
          handleFormSubmit: () => jest.fn(),
          handleFormError: () => jest.fn(),
          handleFormBack: () => jest.fn(),
        },
      }
    );
  }

  it('should render the component correctly when case type is SJP', async () => {
    const { fixture, find, instance } = await renderComponent(manualCaseDefendantMock, 'J', true);

    expect(find(`button[data-role='add']`)).toHaveLength(0);

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component correctly when case type is Non-SJP', async () => {
    const { fixture, find, instance } = await renderComponent(manualCaseDefendantMock, 'Q', false);

    expect(find(`button[data-role='add']`)).toHaveLength(1);

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit valid form with all data entered', async () => {
    const { find, bindings, instance } = await renderComponent(manualCaseDefendantMock, 'J', true);

    const continueButton = find(`button[data-role='continue']`);

    instance.getUuid = generateUUID;

    continueButton.nativeElement.click();

    manualCaseDefendantMock.id = 'uuid-001';

    expect(bindings.handleFormSubmit).toHaveBeenCalledWith({
      action: 'continue',
      defendantToStore: manualCaseDefendantMock,
    });
  });

  it('should submit empty form trigger form error event', async () => {
    jest.useFakeTimers();

    const { find, bindings, fixture } = await renderComponent({}, 'J', true);

    const continueButton = find(`button[data-role='continue']`);
    continueButton.nativeElement.click();
    await fixture.whenStable();
    fixture.detectChanges();

    jest.runAllTimers(); // the pdk emits errors in a setTimeout function, we need to mock this to avoid race conditions

    await fixture.whenStable();
    fixture.detectChanges();

    Promise.resolve(true).then((result) => {
      expect(bindings.handleFormError).toHaveBeenCalled();
    });
  });

  it('should trigger onBack event', async () => {
    const { find, bindings } = await renderComponent(manualCaseDefendantMock, 'J', false);

    const backButton = find('a:last-child');
    backButton.nativeElement.click();

    expect(bindings.handleFormBack).toHaveBeenCalled();
  });
});
