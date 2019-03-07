import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { Offence } from '../../case-overview.interfaces';

@Component({
  selector: 'offence-component',
  template: `
    <span *ngIf="this.offence" pdk-margin-top="5" pdk-margin-bottom="5">
      <div *ngIf="number" pdk-typography="body-medium" pdk-margin="0">Offence {{ number }}</div>
      <div pdk-typography="body-medium" pdk-margin-top="1" pdk-margin-bottom="1">
        <b>Temporary title</b>
      </div>
      <div pdk-typography="body-medium" pdk-margin="0">{{ offence.wording }}</div>
    </span>
    <hr />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffenceComponent {
  @Input() number: number;
  @Input() offence: Offence;
}
