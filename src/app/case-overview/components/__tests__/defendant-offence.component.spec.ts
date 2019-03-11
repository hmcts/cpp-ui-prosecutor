import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PdkBadgeModule, PdkCoreModule, PdkFoldableTextModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { Case, Offence } from '../../case-overview.interfaces';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { DefendantOffenceComponent } from '../defendant-offence.component';
import { FormatDatePipeModule, PleaStatusPipeModule } from '../../../shared/pipes';

describe('DefendantOffenceComponent', () => {
  const offence1 = MOCK_CASE.defendant.offences[0];
  const offence2 = MOCK_CASE.defendant.offences[1];

  let fixture: ComponentFixture<TestDefendantOffenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantOffenceComponent, TestDefendantOffenceComponent],
      imports: [
        CommonModule,
        PdkCoreModule,
        PdkFoldableTextModule,
        PdkBadgeModule,
        FormatDatePipeModule,
        PleaStatusPipeModule
      ]
    });

    fixture = TestBed.createComponent(TestDefendantOffenceComponent);
    fixture.componentInstance.kase = MOCK_CASE;
  });

  it('should compile correctly', () => {
    fixture.componentInstance.offence = offence1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with the offence is pending withdrawal', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      completed: false
    };
    fixture.componentInstance.offence = offence2;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'defendant-offence-test',
    template: `
      <defendant-offence [offence]="offence" [kase]="kase"> </defendant-offence>
    `
  })
  class TestDefendantOffenceComponent {
    offence: Offence;
    kase: Case;
  }
});
