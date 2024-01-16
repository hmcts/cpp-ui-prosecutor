import { CommonModule, Location } from '@angular/common';
import { Shallow } from 'shallow-render';
import { FormsModule } from '@angular/forms';
import { PdkCoreModule, PdkFormModule, PdkGridModule, PdkRadioInputModule } from '@cpp/pdk';
import { ManualCaseModule } from '../../manual-case.module';
import { ManualCaseDefendant } from '../../../core/model';
import { SharedModule } from '../../../shared';
import { ManualCaseDefendantComponent } from '../manual-case-defendant.component';
import { ManualCaseDefendantStateService } from '../../defendants-state.service';
import { ManualCase } from '../../../core/model/manual-case';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

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
  Shallow.alwaysReplaceModule(RouterModule, RouterTestingModule);

  let component: Shallow<ManualCaseDefendantComponent>;

  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');

  beforeEach(() => {
    component = new Shallow(ManualCaseDefendantComponent, ManualCaseModule)
      .provide([Location, ManualCaseDefendantStateService])
      .mock(Location, { back: () => undefined })
      .mock(ManualCaseDefendantStateService, {
        initialise: () => jest.fn(),
        load: () => manualCaseDefendants[0],
        previous: () => manualCaseDefendants[0],
        addNew: () => emptyDefendant,
        next: () => null
      })
      .dontMock(
        CommonModule,
        SharedModule,
        FormsModule,
        PdkRadioInputModule,
        PdkCoreModule,
        PdkFormModule,
        PdkGridModule
      );
  });

  function renderComponent(defendant, caseType, manualCaseDetail, prosecutors) {
    return component.render(
      `<manual-case-defendant
            [manualCaseDefendants]="manualCaseDefendants"
            [manualCaseDetail]="manualCaseDetail"
            [manualCaseType]="manualCaseType"
            [prosecutors]="prosecutors"
            (submitFormData)="handleFormSubmit($event)">
       </manual-case-defendant>`,
      {
        bind: {
          manualCaseDefendants: defendant,
          manualCaseType: caseType,
          manualCaseDetail,
          prosecutors,
          handleFormSubmit: () => jest.fn()
        }
      }
    );
  }

  it('should render the component for the Ist defendant from the list', async () => {
    const { fixture, instance } = await renderComponent(
      manualCaseDefendants,
      'Q',
      manualCaseDetailMock,
      prosecutorsMock
    );

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
    expect(instance.defendantType).toEqual('ORGANISATION');
    expect(instance.editDefendant.organisationName).toEqual(manualCaseDefendants[0].organisationName);
  });

  it('should call submitData() to add a new defendant and do not navigate to the next page', async () => {
    const { bindings, instance } = await renderComponent(
      manualCaseDefendants,
      'Q',
      manualCaseDetailMock,
      prosecutorsMock
    );

    const formData = {
      action: 'add',
      defendantToStore: { id: 'def-id-001' }
    };

    instance.submitData(formData);

    expect(instance.defendantType).toEqual('INDIVIDUAL');
    expect(instance.editDefendant.id).toEqual('');
    expect(instance.errors).toBeFalsy();
    expect(bindings.handleFormSubmit).toHaveBeenCalledWith({
      navigateToNextPage: false,
      defendantToStore: formData.defendantToStore
    });
  });

  it('should call submitData() to post the defendant and continue navigating to the next page', async () => {
    const { bindings, instance } = await renderComponent(
      manualCaseDefendants,
      'Q',
      manualCaseDetailMock,
      prosecutorsMock
    );

    const formData = {
      action: 'continue',
      defendantToStore: { id: 'def-id-001' }
    };

    instance.submitData(formData);

    expect(instance.editDefendant).toBeNull();
    expect(bindings.handleFormSubmit).toHaveBeenCalledWith({
      navigateToNextPage: true,
      defendantToStore: formData.defendantToStore
    });
  });

  it('should call back() load the previous defendant from the in memory list of defendant', async () => {
    const { instance } = await renderComponent(manualCaseDefendants, 'Q', manualCaseDetailMock, prosecutorsMock);

    instance.back();

    expect(instance.defendantType).toEqual('ORGANISATION');
    expect(instance.editDefendant.organisationName).toEqual(manualCaseDefendants[0].organisationName);
  });

  it('should render the component for SJP case and legal entity defendant', async () => {
    const { fixture, instance } = await renderComponent(
      manualCaseDefendants,
      'J',
      manualCaseDetailMock,
      prosecutorsMock
    );

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
    expect(instance.defendantType).toEqual('ORGANISATION');
    expect(instance.editDefendant.organisationName).toEqual(manualCaseDefendants[0].organisationName);
  });

  describe('#isPoliceProsecutor', () => {
    it('should return true if case prosecutor is police', async () => {
      const { instance } = await renderComponent(manualCaseDefendants, 'Q', manualCaseDetailMock, prosecutorsMock);

      expect(instance.isPoliceProsecutor()).toEqual(true);
    });

    it('should return false if prosecutor is not police', async () => {
      const manualCaseDetailMockWithNoPolice = {
        caseId: 'case-id-mock',
        prosecutor: {
          prosecutionAuthorityId: 'prosecutionAuthorityId-2',
          prosecutingAuthority: 'TVL'
        }
      } as ManualCase;
      const { instance } = await renderComponent(
        manualCaseDefendants,
        'Q',
        manualCaseDetailMockWithNoPolice,
        prosecutorsMock
      );

      expect(instance.isPoliceProsecutor()).toEqual(false);
    });

    it('should return false if no prosecutor exist', async () => {
      const manualCaseDetailMockWithNoProsecutor = {
        ...manualCaseDetailMock,
        prosecutor: null
      };
      const { instance } = await renderComponent(
        manualCaseDefendants,
        'Q',
        manualCaseDetailMockWithNoProsecutor,
        prosecutorsMock
      );

      expect(instance.isPoliceProsecutor()).toEqual(false);
    });
  });
});
