import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../contexts/sjp';

@Component({
  selector: 'case-header-badge',
  template: `
    <pdk-page-header>
      <pdk-page-header-content reference="{{ kase.urn }}">
        <span pdk-typography xsmall
          ><b>{{ kase.defendant.personalDetails | defendantName: false }}</b></span
        >
      </pdk-page-header-content>
    </pdk-page-header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseHeaderBadgeComponent {
  @Input() kase: Case;
}
