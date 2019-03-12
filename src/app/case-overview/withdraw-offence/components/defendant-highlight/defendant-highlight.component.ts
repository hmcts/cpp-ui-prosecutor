import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../../../contexts/sjp';

@Component({
  selector: 'defendant-highlight',
  template: `
    <pdk-page-header>
      <pdk-page-header-content reference="{{ case.urn }}">
        <span pdk-typography xsmall
          ><b>{{ case.defendant.personalDetails | defendantName: false }}</b></span
        >
      </pdk-page-header-content>
    </pdk-page-header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefendantHighlightComponent {
  @Input() case: Case;
}
