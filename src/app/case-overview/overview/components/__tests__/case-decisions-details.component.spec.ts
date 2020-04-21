import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CaseDecision} from '../../../../contexts/sjp';
import {MOCK_CASE_DECISION} from '../../../../case-overview/__tests__/test-mock-data';
import {CommonModule} from '@angular/common';
import {PdkDividerModule, PdkGridModule, PdkTabsModule} from '@cpp/pdk';
import {CaseDecisionsDetailsComponent} from '../case-decisions-details.component';
import {VerdictTypePipeModule} from '../../../../shared/pipes/verdict-type/verdict-type.module';
import {
    FirstLastNamePipeModule,
    FormatDatePipeModule,
    SavedDecisionInformationPipeModule
} from '../../../../shared/pipes';
import { MockModule } from '../../../../shared/mock-components/mock.module';
import { NoSeparatePenaltyOffenceDecisionComponent } from '../no-separate-penalty-decision.component';
import { MockNoSeparatePenaltyDecisionComponent } from 'src/app/shared/mock-components/mock-no-separate-penalty-decision.component';

describe('CaseDecisionsDetailsComponent', () => {
    let fixture: ComponentFixture<TestCaseDecisionsDetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CaseDecisionsDetailsComponent,
                TestCaseDecisionsDetailsComponent,
                NoSeparatePenaltyOffenceDecisionComponent
            ],
            imports: [
                CommonModule,
                PdkDividerModule,
                PdkGridModule,
                PdkTabsModule,
                FormatDatePipeModule,
                FirstLastNamePipeModule,
                SavedDecisionInformationPipeModule,
                VerdictTypePipeModule,
                MockModule
            ]
        }).overrideModule(MockModule, {
          remove: {
            declarations: [MockNoSeparatePenaltyDecisionComponent],
            exports: [MockNoSeparatePenaltyDecisionComponent]
          }
        });
        fixture = TestBed.createComponent(TestCaseDecisionsDetailsComponent);
    });

    it('should compile correctly', () => {
        fixture.componentInstance.caseDecisionWithOffenceDecisions = MOCK_CASE_DECISION;
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    @Component({
        selector: 'case-decisions-test',
        template: `
            <case-decisions-details
                    [caseDecisionWithOffenceDecisions]='caseDecisionWithOffenceDecisions'
            ></case-decisions-details>
        `
    })
    class TestCaseDecisionsDetailsComponent {
        @Input() caseDecisionWithOffenceDecisions: CaseDecision;
    }

});
