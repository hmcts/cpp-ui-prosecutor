import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { NoSeparatePenaltyOffenceDecision } from '../../../../contexts/sjp';
import { NoSeparatePenaltyOffenceDecisionComponent } from '../no-separate-penalty-decision.component';

describe('NoSeparatePenaltyOffenceDecisionComponent', () => {
  let fixture: ComponentFixture<TestNoSeparatePenaltyOffenceDecisionComponent>;
  const noSeparatePenaltyOffence = {
    id: 'mock-case-offence-decision-9',
    offenceId: 'offenceId9',
    decisionType: 'NO_SEPARATE_PENALTY',
    verdict: 'PROVED_SJP',
    offenceSequenceNumber: 9,
    offenceTitle: 'Title'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoSeparatePenaltyOffenceDecisionComponent, TestNoSeparatePenaltyOffenceDecisionComponent]
    });
    fixture = TestBed.createComponent(TestNoSeparatePenaltyOffenceDecisionComponent);
  });

  it('should compile correctly with no separate penalty offence decision, that DOES NOT have licenseEndorsement and guilty plea', () => {
    fixture.componentInstance.offenceDecision = {
      ...noSeparatePenaltyOffence,
      licenseEndorsement: false,
      guiltyPleaTakenIntoAccount: false,
    } as NoSeparatePenaltyOffenceDecision;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain(
      'Driver licence record endorsed (no points)');

    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain(
      'Defendant\'s guilty plea taken into account when imposing sentence');
  });

  it('should compile correctly with no separate penalty offence decision, that DOES have licenseEndorsement and guilty plea', () => {
    fixture.componentInstance.offenceDecision = {
      ...noSeparatePenaltyOffence,
      licenseEndorsement: true,
      guiltyPleaTakenIntoAccount: true,
    } as NoSeparatePenaltyOffenceDecision;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(
      'Driver licence record endorsed (no points)');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(
      'Defendant\'s guilty plea taken into account when imposing sentence');
  });

  it('should compile correctly with no separate penalty offence decision, with only guilty plea', () => {
    fixture.componentInstance.offenceDecision = {
      ...noSeparatePenaltyOffence,
      licenseEndorsement: false,
      guiltyPleaTakenIntoAccount: true,
    } as NoSeparatePenaltyOffenceDecision;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain(
      'Driver licence record endorsed (no points)');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(
      'Defendant\'s guilty plea taken into account when imposing sentence');
  });

  it('should compile correctly with no separate penalty offence decision, with only licenseEndorsement', () => {
    fixture.componentInstance.offenceDecision = {
      ...noSeparatePenaltyOffence,
      licenseEndorsement: true,
      guiltyPleaTakenIntoAccount: false,
    } as NoSeparatePenaltyOffenceDecision;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(
      'Driver licence record endorsed (no points)');
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain(
      'Defendant\'s guilty plea taken into account when imposing sentence');
  });


  @Component({
    selector: 'no-separate-penalty-offence-decision-test',
    template: `
      <no-separate-penalty-offence-decision [offenceDecision]="offenceDecision"></no-separate-penalty-offence-decision>
    `
  })
  class TestNoSeparatePenaltyOffenceDecisionComponent {
    @Input() offenceDecision: any;
  }
});
