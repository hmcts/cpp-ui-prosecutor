import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualCaseProsecutorComponent } from '../manual-case-prosecutor.component';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualCase } from '../../../core/model/manual-case';
import { Prosecutor, ProsecutorAutosuggestComponent } from '@cpp/reference-data';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

describe('Manual case prosecutor', () => {
  let fixture: ComponentFixture<ManualCaseProsecutorComponent>;
  let component: ManualCaseProsecutorComponent;

  const manualCaseDetailMock = {
    initiationCode: 'J', // SJP Case
    prosecutor: {},
    originatingPoliceForce: {}
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ProsecutorAutosuggestComponent, ManualCaseProsecutorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        provideMockStore(),
        provideRouter([]),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(ManualCaseProsecutorComponent);
    component = fixture.componentInstance;
    component.manualCaseDetail = manualCaseDetailMock;
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component with a npp', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render for npp', () => {
    component.nonPoliceProsecutor = {
      id: ':id',
      oucode: 'ouCode',
      fullName: 'DVLA',
      address: {
        address1: ':address1',
        address2: ':address2',
        postcode: ':postcode'
      }
    } as Prosecutor;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should return type Summons if selected', () => {
    expect(component._isTypeSummons()).toBe(false);

    component.manualCaseDetail = { ...manualCaseDetailMock, initiationCode: 'S' };
    component.editManualCase = { ...manualCaseDetailMock, initiationCode: 'S' };
    component.ngOnInit();

    expect(component._isTypeSummons()).toBe(true);
  });

  it('should emit an event on submit', () => {
    component.editManualCase = { caseId: '1-2-3-4' };
    component.submitFormData.subscribe(data => {
      component.submitData();
      expect(data).toEqual({ caseId: '1-2-3-4' });
    });
  });

  it('should select the appropriate Prosecuting Authority', () => {
    fixture.detectChanges();
    const prosecutor = {
      id: '1',
      oucode: 'a',
      shortName: 'a'
    };
    component.onSelectedProsecutionAuthority(prosecutor as Prosecutor);
    expect(component.editManualCase.prosecutor.prosecutionAuthorityId).toBe('1');
    expect(component.editManualCase.prosecutor.prosecutingAuthority).toBe('a');
  });

  it('should select the appropriate cps prosecutor', () => {
    const cpsProsecutor = {
      id: 'cpsOrganisationIdMock',
      oucode: 'cpsProsecutorOuCodeMock',
      fullName: 'cpsProsecutorMock',
      cpsFlag: true
    } as Prosecutor;
    component.editManualCase.prosecutor.prosecutingAuthority = 'prosecutorOuCode';
    component.onSelectedCpsProsecutor(cpsProsecutor);
    expect(component.editManualCase.cpsOrganisation).toBe('cpsProsecutorOuCodeMock');
    expect(component.editManualCase.cpsOrganisationId).toBe('cpsOrganisationIdMock');
  });

  it('should set as undefined if no cpsProsecutor', () => {
    component.editManualCase.prosecutor.prosecutingAuthority = 'prosecutorOuCode';
    component.onSelectedCpsProsecutor();
    expect(component.editManualCase.cpsOrganisation).toBe(undefined);
  });

  it('should call updateProsecutionReferenceNo', () => {
    component.updateProsecutionReferenceNo(true);
    expect(component.editManualCase.prosecutorCaseReference).toBe(undefined);
    component.updateProsecutionReferenceNo(false);
    expect(component.editManualCase.prosecutorCaseReference).toBe(undefined);
  });

  it('should render if no manual case details', () => {
    component.manualCaseDetail.prosecutor = undefined;
    component.nonPoliceProsecutor.cpsFlag = false;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.editManualCase.originatingOrganisation).toBe(undefined);
  });

  it('should render if no manual case details', () => {
    component.manualCaseDetail.prosecutor = undefined;
    component.nonPoliceProsecutor.cpsFlag = true;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.editManualCase.originatingPoliceForce).toEqual({});
  });

  it('should setManualCaseProsecutor', () => {
    component.setManualCaseProsecutor();
    expect(component.editManualCase.originatingOrganisation).toEqual(undefined);
  });

  it('should show prosecutor title when full name is not there', () => {
    component.nonPoliceProsecutor = {
      id: ':id',
      oucode: 'ouCode',
      address: {
        address1: ':address1',
        address2: ':address2',
        postcode: ':postcode'
      }
    } as Prosecutor;
    component.manualCaseDetail = manualCaseDetailMock;
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('h1');
    // No translations are loaded in the test, so the translate pipe echoes the key.
    expect(content.textContent.trim()).toEqual('MANUAL_CASE_PROSECUTOR.TITLE');
  });

  it('should render the prosecuting authority search', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should populate the prosecutor when one is selected from the search', () => {
    const prosecutor = {
      id: '1',
      oucode: 'OU1',
      fullName: 'Test Authority',
      standard: true,
      address: { address1: ':address1' }
    } as Prosecutor;

    component.onSelectedProsecutionAuthority(prosecutor);

    expect(component.editManualCase.prosecutor.prosecutionAuthorityId).toBe('1');
    expect(component.editManualCase.prosecutor.prosecutingAuthority).toBe('OU1');
    expect(component.editManualCase.prosecutor.name).toBe('Test Authority');
    expect(component.editManualCase.prosecutor.address).toEqual({ address1: ':address1' });
    expect(component.editManualCase.originatingOrganisation).toBe('OU1');
  });

  it('should filter to standard prosecutors when a cps prosecutor', () => {
    expect(component.standardProsecutors({ standard: true } as Prosecutor)).toBe(true);
    expect(component.standardProsecutors({ standard: false } as Prosecutor)).toBe(false);
  });

  it('should restrict non-cps prosecutors to the allowed codes', () => {
    component.nonPoliceProsecutor = { cpsFlag: false } as Prosecutor;
    component.nonCpsProsecutorCodes = ['ABC', 'DEF'];

    expect(component.standardProsecutors({ standard: true, shortName: 'ABC' } as Prosecutor)).toBe(true);
    expect(component.standardProsecutors({ standard: true, shortName: 'XYZ' } as Prosecutor)).toBe(false);
    expect(component.standardProsecutors({ standard: false, shortName: 'ABC' } as Prosecutor)).toBe(false);
  });
});
