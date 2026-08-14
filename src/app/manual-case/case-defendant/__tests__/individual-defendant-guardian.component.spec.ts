import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManualCaseDefendant } from '../../../core/model';
import { IndividualDefendantGuardianComponent } from '../individual-defendant-guardian.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';

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
        contactDetails: {},
        address: {
          address1: '',
          address2: '',
          address3: '',
          address4: '',
          address5: '',
          postcode: ''
        }
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
        address1: 'No fixed adobe',
        address2: '',
        address3: '',
        address4: '',
        address5: '',
        postcode: ''
      }
    }
  }
} as ManualCaseDefendant;

describe('Individual Defendant Guardian Component', () => {
  let fixture: ComponentFixture<TestIndividualDefendantGuardianComponent>;
  let guardianComponent: IndividualDefendantGuardianComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestIndividualDefendantGuardianComponent, IndividualDefendantGuardianComponent],
      providers: [
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestIndividualDefendantGuardianComponent);
    guardianComponent = fixture.debugElement.query(By.directive(IndividualDefendantGuardianComponent))
      .componentInstance;
  });

  it('should render the defendant form correctly when individual is a guardian', () => {
    fixture.componentInstance.manualCaseDefendant = { ...individualCaseDefendant };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.detectChanges();

    expect(guardianComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should copy defendant address to individual-guardian-address', () => {
    fixture.componentInstance.manualCaseDefendant = { ...individualCaseDefendant };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.detectChanges();

    const sameAsButton = fixture.debugElement.query(By.css('a[data-role="same-as-individual-defendant"]'));
    sameAsButton.nativeElement.click();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should copy defendant address to organisation-guardian-address', () => {
    fixture.componentInstance.manualCaseDefendant = { ...defendantWithCompanyAstGuardian };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.detectChanges();

    const sameAsButton = fixture.debugElement.query(By.css('a[data-role="same-as-organisation-defendant"]'));
    sameAsButton.nativeElement.click();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should clear guardian form when remove button is clicked', () => {
    fixture.componentInstance.manualCaseDefendant = { ...individualCaseDefendant };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.detectChanges();

    expect(guardianComponent.showGuardian).toBeTruthy();

    const removeButton = fixture.debugElement.query(By.css('a[data-role="remove-guardian-link"]'));
    removeButton.nativeElement.click();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(guardianComponent.showGuardian).toBeFalsy();
  });

  it('should not render noFixedAbode checkbox when case type is Summons and individual is a guardian', () => {
    fixture.componentInstance.manualCaseDefendant = { ...individualCaseDefendant };
    fixture.componentInstance.manualCaseType = 'S';
    fixture.detectChanges();

    const noFixedAbodeCheckbox = fixture.debugElement.query(By.css(`pdk-checkbox[data-role='no-fixed-abode']`));
    expect(noFixedAbodeCheckbox).toBeNull();
    expect(guardianComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should not render noFixedAbode checkbox when case type is Summons and company is a guardian', () => {
    fixture.componentInstance.manualCaseDefendant = { ...defendantWithCompanyAstGuardian };
    fixture.componentInstance.manualCaseType = 'S';
    fixture.detectChanges();

    const noFixedAbodeCheckbox = fixture.debugElement.query(By.css(`pdk-checkbox[data-role='no-fixed-abode']`));
    expect(noFixedAbodeCheckbox).toBeNull();
    expect(guardianComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'individual-defendant-guardian-test',
    template: `
      <form #form="ngForm" pdk-form>
        <individual-defendant-guardian [manualCaseType]="manualCaseType" [manualCaseDefendant]="manualCaseDefendant">
        </individual-defendant-guardian>
      </form>
    `,
    imports: [FormsModule, IndividualDefendantGuardianComponent]
  })
  class TestIndividualDefendantGuardianComponent {
    manualCaseDefendant: ManualCaseDefendant;
    manualCaseType: string;
  }
});
