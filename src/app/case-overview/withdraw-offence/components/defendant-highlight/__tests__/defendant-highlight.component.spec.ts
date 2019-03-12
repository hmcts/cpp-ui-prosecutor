import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkPageHeaderModule } from '@cpp/pdk';
import { DefendantHighlightModule } from '../defendant-highlight.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefendantNamePipeModule } from '../../../../../shared/pipes';
import { MOCK_CASE } from '../../../../__tests__/test-mock-data';
import { Case } from '../../../../../contexts/sjp';

describe('defendant-highlight', () => {
  let fixture: ComponentFixture<DefendantHighlightTest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefendantHighlightTest],
      imports: [CommonModule, FormsModule, DefendantNamePipeModule, PdkPageHeaderModule, DefendantHighlightModule]
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
    <defendant-highlight [case]="kase"></defendant-highlight>
  `
})
class DefendantHighlightTest {
  kase: Case = MOCK_CASE;
}
