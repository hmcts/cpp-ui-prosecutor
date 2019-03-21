import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'offence-warning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- @ux // todo will be removed, doesn't complain GDS -->
    <pdk-form-group [error]="true">
      <div pdk-typography="heading-small" pdk-text-colour="red">
        <ng-content></ng-content>
      </div>
    </pdk-form-group>
  `
})
export class OffenceWarningComponent {}
