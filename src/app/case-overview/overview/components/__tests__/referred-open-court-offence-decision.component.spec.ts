import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ReferredToOpenCourtOffenceDecision } from '../../../../contexts/sjp';
import { CommonModule } from '@angular/common';
import { PdkDividerModule, PdkGridModule } from '@cpp/pdk';
import { ReferredToOpenCourtOffenceDecisionComponent } from '../referred-open-court-offence-decision.component';
import { SharedModule } from '../../../../shared';
import {ExpectedConditions} from 'protractor';

describe('ReferredOpenCourtOffeneDecision', () => {
  let fixture: ComponentFixture<TestReferreredOpenourtOffenceDecisionComponent>;
  const referredToOpenCourtOffenceDecision: ReferredToOpenCourtOffenceDecision = {
    id: 'mock-case-offence-decision-1',
    offenceId: 'offenceId1',
    decisionType: 'REFERRED_TO_OPEN_COURT',
    offenceTitle: 'Use / install a television set without a licence',
    reason: 'Equivocal plea (For Trial)',
    magistratesCourt: 'Lavender Hill Magistrates\' Court',
    referredToCourt: 'south West London Magistrates\' Court',
    referredToRoom: 5,
    referredToDateTime: '2019-06-04T14:34:54.164Z',
    offenceSequenceNumber: 1,
    verdict: 'FOUND_GUILTY'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestReferreredOpenourtOffenceDecisionComponent, ReferredToOpenCourtOffenceDecisionComponent, MockFormatDatePipe],
      imports: [CommonModule, PdkDividerModule, PdkGridModule, SharedModule]
    });
    fixture = TestBed.createComponent(TestReferreredOpenourtOffenceDecisionComponent);
  });

  it('should compile correctly', () => {
    fixture.componentInstance.offenceDecision = referredToOpenCourtOffenceDecision;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.nativeElement.querySelector('p').textContent).toContain(
        'Summons issued for hearing before south West London Magistrates\' Court');
  });

  @Component({
    selector: 'referred-open-court-offence-decision-test',
    template: `
      <refer-to-open-court-offence-decision [offenceDecision]="offenceDecision"></refer-to-open-court-offence-decision>
    `
  })
  class TestReferreredOpenourtOffenceDecisionComponent {
    @Input() offenceDecision: ReferredToOpenCourtOffenceDecision;
  }

  @Pipe({
    name: 'formatDate'
  })
  class MockFormatDatePipe implements PipeTransform {
    transform(value: any) {
      return value;
    }
  }
});
