import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseCreateSuccessComponent } from '../manual-case-create-success.component';
import { CommonModule } from '@angular/common';
import { PdkContextPanelModule } from '@cpp/pdk';
import { MockPipesModule } from '../../../shared/pipes/mock-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualCase } from '../../../core/model/manual-case';

describe('Manual case create success', () => {
  let fixture: ComponentFixture<CaseCreateSuccessComponent>;
  let component: CaseCreateSuccessComponent;

  const manualCaseDetailMock = {
    initiationCode: 'J', // SJP Case
    prosecutor: {},
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureCompiler({ preserveWhitespaces: false } as any).configureTestingModule({
      declarations: [CaseCreateSuccessComponent],
      imports: [CommonModule, PdkContextPanelModule, MockPipesModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(CaseCreateSuccessComponent);
    component = fixture.componentInstance;
    component.caseDetails = manualCaseDetailMock;
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should return type SJP if selected', () => {
    expect(component.isTypeSjp).toBeTruthy();
  });
});
