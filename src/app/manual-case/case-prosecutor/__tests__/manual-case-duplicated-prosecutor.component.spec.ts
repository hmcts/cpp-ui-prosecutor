import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';

import { ManualCase } from '../../../core/model/manual-case';
import { ProsecutorValidator } from '../../../shared/validators';
import { ManualCaseDuplicatedProsecutorComponent } from '../manual-case-duplicated-prosecutor.component';
import { AgeMockPipe } from '../../../shared/pipes/mock-pipes/age-mock.pipe';
import { TranslateMockPipe } from '../../../shared/pipes/mock-pipes/translate-mock.pipe';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

describe('Manual case prosecutor', () => {
  let fixture: ComponentFixture<ManualCaseDuplicatedProsecutorComponent>;
  let component: ManualCaseDuplicatedProsecutorComponent;

  const manualCaseDetailMock = {
    initiationCode: 'J', // SJP Case
    prosecutor: {}
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AgeMockPipe,
        TranslateMockPipe,
        ManualCaseDuplicatedProsecutorComponent,
        ProsecutorValidator
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        provideRouter([]),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
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
