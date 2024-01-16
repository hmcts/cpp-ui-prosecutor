import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'dev-tools-select-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div pdk-container>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">
        Developer tools
      </h1>

      <h3 pdk-typography="heading-medium">Select a user</h3>
      <form pdk-form novalidate (validSubmit)="selectUser.emit(form.value.userId)">
        <pdk-form-field>
          <pdk-select
            id="selectUser"
            name="userId"
            [(ngModel)]="userId"
            [options]="users"
            placeholder="---Please select---"
            required
          >
          </pdk-select>
        </pdk-form-field>
        <pdk-form-group>
          <button pdk-button [disabled]="!userId" type="submit">
            Confirm identity
          </button>
        </pdk-form-group>
      </form>
    </div>
  `
})
export class DevtoolsSelectUserComponent {
  @ViewChild(NgForm, { static: true }) form: NgForm;

  @Input() users: any[];
  @Input() userId: string;
  @Output() selectUser = new EventEmitter<string>();
}
