import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PdkFoldableTextComponent, PdkMarginDirective, PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: 'statement-of-facts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4 pdk-typography="heading-medium">Statement of facts</h4>
    <div pdk-margin-bottom="8">
      <pdk-foldable-text pdk-typography="body-medium">
        {{ statementOfFacts }}
      </pdk-foldable-text>
    </div>
  `,
  imports: [PdkTypographyDirective, PdkFoldableTextComponent, PdkMarginDirective]
})
export class StatementOfFactsComponent {
  @Input() statementOfFacts: string;
}
