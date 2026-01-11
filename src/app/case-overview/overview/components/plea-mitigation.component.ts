import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PdkMarginDirective, PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: 'plea-mitigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4 pdk-typography="heading-medium">Mitigation</h4>
    <p pdk-margin-bottom="4">
      {{ pleaMitigation }}
    </p>
  `,
  imports: [PdkTypographyDirective, PdkMarginDirective]
})
export class PleaMitigationComponent {
  @Input() pleaMitigation: string;
}
