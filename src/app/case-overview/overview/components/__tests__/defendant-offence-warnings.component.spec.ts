import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { Component } from '@angular/core';
import { Offence } from '../../../../contexts/sjp';
import { DefendantOffenceWarningsComponent } from '../defendant-offence-warnings.component';

describe('DefendantOffenceWarnings', () => {
  let fixture: ComponentFixture<TestDefendantOffenceWarningsComponent>;

  const { defendant } = MOCK_CASE;
  const { offences } = defendant;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDefendantOffenceWarningsComponent, MockOffenceWarningsComponent, DefendantOffenceWarningsComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestDefendantOffenceWarningsComponent);
  });

  it('should compile correctly with all warnings', () => {
    fixture.componentInstance.offence = {
      ...offences[0],
      outOfTime: true,
      notInEffect: true,
      imprisonable: true
    };

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly without any warnings', () => {
    fixture.componentInstance.offence = {
      ...offences[0],
      outOfTime: false,
      notInEffect: false,
      imprisonable: false
    };

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-offence-warnings-test',
    template: `
      <defendant-offence-warnings [offence]="offence"></defendant-offence-warnings>
    `,
    imports: [DefendantOffenceWarningsComponent]
  })
  class TestDefendantOffenceWarningsComponent {
    offence: Offence;
  }

  @Component({
    selector: 'offence-warning',
    template: `
      <ng-content></ng-content>
    `,
    imports: [DefendantOffenceWarningsComponent]
  })
  class MockOffenceWarningsComponent {}
});
