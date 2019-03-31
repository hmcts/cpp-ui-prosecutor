import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkPageHeaderModule } from '@cpp/pdk';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefendantNamePipeModule } from '../../../shared/pipes';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { Case } from '../../../contexts/sjp';
import { CaseHeaderBadgeModule } from '../case-header-badge.module';

describe('defendant-highlight', () => {
  let fixture: ComponentFixture<DefendantHighlightTest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantHighlightTest],
      imports: [CommonModule, FormsModule, DefendantNamePipeModule, PdkPageHeaderModule, CaseHeaderBadgeModule]
    });

    fixture = TestBed.createComponent(DefendantHighlightTest);
    fixture.detectChanges();
  });

  it('should render and match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'defendant-highlight-test',
  template: `
    <case-header-badge [kase]="kase"></case-header-badge>
  `
})
class DefendantHighlightTest {
  kase: Case = MOCK_CASE;
}
