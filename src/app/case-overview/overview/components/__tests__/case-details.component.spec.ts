import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkCoreModule, PdkGridModule, PdkPageHeaderModule } from '@cpp/pdk';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import {
  AgePipeModule,
  CaseProsecutorPipeModule,
  CaseStatusPipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  IfEmptyPipeModule
} from '../../../../shared/pipes';
import { CaseDetailsComponent } from '../case-details.component';
import { Case } from '../../../../contexts/sjp';

describe('CaseDetailsComponent', () => {
  let fixture: ComponentFixture<TestCaseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDetailsComponent, TestCaseDetailsComponent],
      imports: [
        PdkCoreModule,
        PdkPageHeaderModule,
        PdkGridModule,
        AgePipeModule,
        IfEmptyPipeModule,
        DefendantNamePipeModule,
        CaseStatusPipeModule,
        CaseProsecutorPipeModule,
        FormatDatePipeModule,
        FormatAddressPipeModule
      ]
    });

    fixture = TestBed.createComponent(TestCaseDetailsComponent);
    fixture.componentInstance.kase = MOCK_CASE;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with re-opened date', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      reopenedDate: '2018-12-12',
      libraCaseNumber: 'case123',
      reopenedInLibraReason: 'collateral damage'
    };

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly if listed in criminal court', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      listedInCriminalCourts: true,
      hearingCourtName: 'Hearing court ',
      hearingTime: '2018-12-12'
    };

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-details-test',
    template: `
      <case-details [kase]="kase"> </case-details>
    `
  })
  class TestCaseDetailsComponent {
    kase: Case;
  }
});
