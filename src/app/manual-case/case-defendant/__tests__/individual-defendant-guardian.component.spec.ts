import { Shallow } from 'shallow-render';
import { FormsModule, ReactiveFormsModule, ControlContainer, NgForm } from '@angular/forms';
import {
  PdkCoreModule,
  PdkFormModule,
  PdkRadioInputModule,
  PdkInsetTextModule,
  PdkTextareaModule,
  PdkInputModule,
  PdkDateInputModule,
  PdkGridModule
} from '@cpp/pdk';
import { ManualCaseModule } from '../../manual-case.module';
import { ManualCaseDefendant } from '../../../core/model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared';
import { IndividualDefendantGuardianComponent } from '../individual-defendant-guardian.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

const individualCaseDefendant = {
  individual: {
    personalInformation: {
      contactDetails: {},
      address: {
        address1: '11 Wilton Road',
        address2: 'Eastfield',
        address3: 'Peterborough',
        address4: '',
        address5: '',
        postcode: 'PE1 5ZZ'
      }
    },
    parentGuardianInformation: {
      personalInformation: {
        lastName: 'Guardian One',
        contactDetails: {}
      }
    }
  }
} as ManualCaseDefendant;

const defendantWithCompanyAstGuardian = {
  individual: {
    personalInformation: {
      contactDetails: {},
      address: {
        address1: '11 Wilton Road',
        address2: 'Eastfield',
        address3: 'Peterborough',
        address4: '',
        address5: '',
        postcode: 'PE1 5ZZ'
      }
    },
    parentGuardianInformation: {
      personalInformation: { lastName: '' },
      organisationName: 'ZZZ Company',
      address: {
        address1: 'No fixed adobe'
      }
    }
  }
} as ManualCaseDefendant;

describe('Individual Defendant Guardian Component', () => {
  Shallow.alwaysReplaceModule(RouterModule, RouterTestingModule);
  let component: Shallow<IndividualDefendantGuardianComponent>;

  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');

  beforeEach(() => {
    component = new Shallow(IndividualDefendantGuardianComponent, ManualCaseModule)
      .provide([ControlContainer, NgForm])
      .dontMock(
        CommonModule,
        SharedModule,
        FormsModule,
        PdkRadioInputModule,
        ReactiveFormsModule,
        PdkCoreModule,
        PdkFormModule,
        NgForm,
        PdkInputModule,
        PdkRadioInputModule,
        PdkInsetTextModule,
        PdkCoreModule,
        PdkDateInputModule,
        PdkTextareaModule,
        PdkGridModule
      );
  });

  function renderComponent(manualCaseDefendant, manualCaseType) {
    return component.render(
      `<individual-defendant-guardian
          [manualCaseType]="manualCaseType"
          [manualCaseDefendant]="manualCaseDefendant">
       </individual-defendant-guardian>`,
      {
        bind: {
          manualCaseDefendant,
          manualCaseType
        }
      }
    );
  }

  it('should render the defendant form correctly when individual is a guardian', async () => {
    const { fixture, instance } = await renderComponent(individualCaseDefendant, 'J');

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should copy defendant address to individual-guardian-address', async () => {
    const { find, fixture } = await renderComponent(individualCaseDefendant, 'J');
    const sameAsButton = find('a[data-role="same-as-individual-defendant"]');

    sameAsButton.nativeElement.click();
    expect(fixture).toMatchSnapshot();
  });

  it('should copy defendant address to organisation-guardian-address', async () => {
    const { find, fixture } = await renderComponent(defendantWithCompanyAstGuardian, 'J');
    const sameAsButton = find('a[data-role="same-as-organisation-defendant"]');

    sameAsButton.nativeElement.click();
    expect(fixture).toMatchSnapshot();
  });

  it('should clear guardian form when remove button is clicked', async () => {
    const { find, instance, fixture } = await renderComponent(individualCaseDefendant, 'J');
    const removeButton = find('a[data-role="remove-guardian-link"]');

    expect(instance.showGuardian).toBeTruthy();
    removeButton.nativeElement.click();
    expect(fixture).toMatchSnapshot();
    expect(instance.showGuardian).toBeFalsy();
  });

  it('should not render noFixedAbode checkbox when case type is Summons and individual is a guardian', async () => {
    const { fixture, find, instance } = await renderComponent(individualCaseDefendant, 'S');

    expect(find(`pdk-checkbox[data-role='no-fixed-abode']`)).toHaveLength(0);
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should not render noFixedAbode checkbox when case type is Summons and company is a guardian', async () => {
    const { fixture, find, instance } = await renderComponent(defendantWithCompanyAstGuardian, 'S');

    expect(find(`pdk-checkbox[data-role='no-fixed-abode']`)).toHaveLength(0);
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
