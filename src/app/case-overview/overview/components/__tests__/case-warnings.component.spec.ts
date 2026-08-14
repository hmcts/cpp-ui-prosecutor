import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { Component } from '@angular/core';
import { Defendant, Offence } from '../../../../contexts/sjp';
import { CaseWarningsComponent } from '../case-warnings.component';

describe('CaseWarnings', () => {
  let fixture: ComponentFixture<TestCaseWarningsComponent>;

  const { defendant } = MOCK_CASE;
  const { offences } = defendant;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestCaseWarningsComponent, CaseWarningsComponent],
      teardown: { destroyAfterEach: false }
    });

    Date.now = jest.fn(() => Date.parse('2017-02-14'));
    fixture = TestBed.createComponent(TestCaseWarningsComponent);
  });

  it('should compile correctly with all warnings', () => {
    defendant.personalDetails.dateOfBirth = '2000-02-14';

    fixture.componentInstance.defendant = defendant;
    fixture.componentInstance.offences = [
      {
        ...offences[0],
        chargeDate: '2017-01-14',
        outOfTime: true,
        notInEffect: true,
        imprisonable: true
      }
    ];

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly without any warnings', () => {
    fixture.componentInstance.defendant = defendant;
    fixture.componentInstance.offences = [
      {
        ...offences[0],
        chargeDate: '2017-01-14',
        outOfTime: false,
        notInEffect: false,
        imprisonable: false
      }
    ];

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-warnings-test',
    template: `
      <case-warnings [defendant]="defendant" [offences]="offences"></case-warnings>
    `,
    imports: [CaseWarningsComponent]
  })
  class TestCaseWarningsComponent {
    defendant: Defendant;
    offences: Offence[];
  }
});
