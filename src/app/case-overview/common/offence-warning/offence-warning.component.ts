import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PdkFormGroupComponent, PdkFormGroupDirective, PdkTextColorDirective, PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: 'offence-warning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- @ux // todo will be removed, doesn't complain GDS -->
    <pdk-form-group [hasError]="true">
      <div pdk-typography="heading-small" pdk-text-colour="red">
        <ng-content></ng-content>
      </div>
    </pdk-form-group>
  `,
  imports: [PdkFormGroupComponent, PdkTypographyDirective, PdkTextColorDirective, PdkFormGroupDirective]
})
export class OffenceWarningComponent {}
