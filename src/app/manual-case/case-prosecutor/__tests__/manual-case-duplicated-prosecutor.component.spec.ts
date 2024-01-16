import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';
import { PdkCoreModule, PdkFormModule, PdkDateInputModule, PdkGridModule, PdkRadioInputModule } from '@cpp/pdk';
import { MockPipesModule } from '../../../shared/pipes/mock-pipes';
import { ManualCase } from '../../../core/model/manual-case';
import { ProsecutorValidator } from '../../../shared/validators';
import { ManualCaseDuplicatedProsecutorComponent } from '../manual-case-duplicated-prosecutor.component';

describe('Manual case prosecutor', () => {
  let fixture: ComponentFixture<ManualCaseDuplicatedProsecutorComponent>;
  let component: ManualCaseDuplicatedProsecutorComponent;

  const manualCaseDetailMock = {
    initiationCode: 'J', // SJP Case
    prosecutor: {}
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManualCaseDuplicatedProsecutorComponent, ProsecutorValidator],
      imports: [
        CommonModule,
        FormsModule,
        PdkCoreModule,
        PdkFormModule,
        PdkGridModule,
        PdkRadioInputModule,
        PdkDateInputModule,
        MockPipesModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ControlContainer, NgForm]
    });

    fixture = TestBed.createComponent(ManualCaseDuplicatedProsecutorComponent);
    component = fixture.componentInstance;
    component.manualCaseDetail = manualCaseDetailMock;
    component.editManualCase = manualCaseDetailMock;
  });

  it('should render the component', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should call updateProsecutionReferenceNo', () => {
    fixture.detectChanges();
    component.updateProsecutionReferenceNo(true);
    expect(component.editManualCase.prosecutorCaseReference).toBe(undefined);
    component.updateProsecutionReferenceNo(false);
    expect(component.editManualCase.prosecutorCaseReference).toBe(undefined);
  });
});
