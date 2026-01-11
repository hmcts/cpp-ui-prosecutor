import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrganisationDefendantFormComponent } from '../organisation-defendant-form.component';
import { ManualCaseDefendant } from '../../../core/model/manual-case-defendant';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: prop => {
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
    postcode: 'SL1 5ZZ'
  },
  emailAddress1: 'ben@abc.com',
  telephoneNumberBusiness: '07966666666',
  documentationLanguage: 'ENGLISH',
  hearingLanguage: 'WELSH',
  numPreviousConvictions: 10,
  asn: '3'
} as ManualCaseDefendant;

describe('Organisation Defendant Form Component', () => {
  let fixture: ComponentFixture<TestOrganisationDefendantFormComponent>;
  let formComponent: OrganisationDefendantFormComponent;
  const generateUUID = jest.fn();
  generateUUID.mockReturnValue('uuid-001');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestOrganisationDefendantFormComponent, OrganisationDefendantFormComponent],
      providers: [
        provideMockStore({
          initialState: {}
        }),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestOrganisationDefendantFormComponent);
    formComponent = fixture.debugElement.query(By.directive(OrganisationDefendantFormComponent)).componentInstance;
  });

  it('should render the component correctly when case type is SJP', () => {
    fixture.componentInstance.manualCaseDefendant = { ...manualCaseDefendantMock };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.componentInstance.isPoliceProsecutor = true;
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css(`button[data-role='add']`));
    expect(addButton).toBeNull();
    expect(formComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component correctly when case type is Non-SJP', () => {
    fixture.componentInstance.manualCaseDefendant = { ...manualCaseDefendantMock };
    fixture.componentInstance.manualCaseType = 'Q';
    fixture.componentInstance.isPoliceProsecutor = false;
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css(`button[data-role='add']`));
    expect(addButton).toBeTruthy();
    expect(formComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit valid form with all data entered', () => {
    fixture.componentInstance.manualCaseDefendant = { ...manualCaseDefendantMock };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.componentInstance.isPoliceProsecutor = true;
    fixture.detectChanges();

    formComponent.getUuid = generateUUID;

    const continueButton = fixture.debugElement.query(By.css(`button[data-role='continue']`));
    continueButton.nativeElement.click();
    fixture.detectChanges();

    const expectedDefendant = { ...manualCaseDefendantMock };
    expectedDefendant.id = 'uuid-001';

    expect(fixture.componentInstance.handleFormSubmit).toHaveBeenCalledWith({
      action: 'continue',
      defendantToStore: expectedDefendant
    });
  });

  it('should submit empty form trigger form error event', fakeAsync(() => {
    const emptyModel = {} as ManualCaseDefendant;

    fixture.componentInstance.manualCaseDefendant = emptyModel;
    fixture.componentInstance.manualCaseType = 'J';
    fixture.componentInstance.isPoliceProsecutor = true;
    fixture.detectChanges();
    tick();

    const continueButton = fixture.debugElement.query(By.css(`button[data-role='continue']`));
    continueButton.nativeElement.click();
    fixture.detectChanges();
    tick(); // the pdk emits errors in a setTimeout function, we need to tick to advance timers

    fixture.detectChanges();
    tick();

    expect(fixture.componentInstance.handleFormError).toHaveBeenCalled();
  }));

  it('should trigger onBack event', () => {
    fixture.componentInstance.manualCaseDefendant = { ...manualCaseDefendantMock };
    fixture.componentInstance.manualCaseType = 'J';
    fixture.componentInstance.isPoliceProsecutor = false;
    fixture.detectChanges();

    const backButton = fixture.debugElement.query(By.css('a:last-child'));
    backButton.nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.handleFormBack).toHaveBeenCalled();
  });

  @Component({
    selector: 'organisation-defendant-form-test',
    template: `
      <organisation-defendant-form
        [manualCaseDefendant]="manualCaseDefendant"
        [manualCaseType]="manualCaseType"
        [showAddButton]="true"
        [isPoliceProsecutor]="isPoliceProsecutor"
        (formSubmit)="handleFormSubmit($event)"
        (formError)="handleFormError($event)"
        (goBack)="handleFormBack($event)"
      >
      </organisation-defendant-form>
    `,
    imports: [OrganisationDefendantFormComponent]
  })
  class TestOrganisationDefendantFormComponent {
    manualCaseDefendant: ManualCaseDefendant;
    manualCaseType: string;
    isPoliceProsecutor: boolean;
    handleFormSubmit = jest.fn();
    handleFormError = jest.fn();
    handleFormBack = jest.fn();
  }
});
