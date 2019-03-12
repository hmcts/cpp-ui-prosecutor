import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Offence } from '../../contexts/sjp';

@Component({
  selector: 'offence-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  template: `
    <div *ngIf="this.offence" pdk-margin-vertical="5" pdk-typography="body-medium">
      <pdk-divider></pdk-divider>
      <div *ngIf="number" pdk-margin="0">
        <b>Offence {{ number }}: {{ offence.title }}</b>
      </div>
      <pdk-foldable-text pdk-margin-top="2">
        {{ offence.wording }}
      </pdk-foldable-text>

      <div pdk-margin-vertical="4">
        <pdk-badge>
          Pending withdrawal
        </pdk-badge>
      </div>

      <pdk-form-field>
        <pdk-radio-group inline #test name="{{ offence.id }}" ngModel required>
          <pdk-radio-button value="true">Yes</pdk-radio-button>
          <pdk-radio-button value="false">No</pdk-radio-button>
        </pdk-radio-group>
      </pdk-form-field>
    </div>
  `
})
export class OffenceComponent {
  @Input() number: number;
  @Input() offence: Offence;
}
