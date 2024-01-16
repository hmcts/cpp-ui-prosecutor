import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualCaseProsecutorComponent } from '../manual-case-prosecutor.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';
import {
  PdkCoreModule,
  PdkFormModule,
  PdkDateInputModule,
  PdkTextInputModule,
  PdkInputModule,
  PdkCurrencyInputModule,
  PdkAutosuggestModule
} from '@cpp/pdk';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualCase } from '../../../core/model/manual-case';
import { MockPipesModule } from '../../../shared/pipes/mock-pipes';
import { Prosecutor, ProsecutorAutosuggestComponent } from '@cpp/reference-data';
import { provideMockStore } from '@ngrx/store/testing';

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
      declarations: [ManualCaseProsecutorComponent, ProsecutorAutosuggestComponent],
      imports: [
        CommonModule,
        FormsModule,
        PdkCoreModule,
        PdkFormModule,
        PdkDateInputModule,
        MockPipesModule,
        RouterTestingModule,
        PdkTextInputModule,
        PdkInputModule,
        PdkCurrencyInputModule,
        PdkAutosuggestModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ControlContainer, NgForm, provideMockStore()]
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
});
