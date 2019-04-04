import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../../contexts/sjp';

@Component({
  selector: 'case-header-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div pdk-margin-top="4">
      <pdk-page-header>
        <pdk-page-header-content reference="{{ kase.urn }}">
          <b>{{ kase.defendant.personalDetails | defendantName: false }}</b>
        </pdk-page-header-content>
      </pdk-page-header>
    </div>
  `
})
export class CaseHeaderBadgeComponent {
  @Input() kase: Case;
}
