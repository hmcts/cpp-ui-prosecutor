import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case } from '../../contexts/sjp';
import { PdkButtonDirective, PdkCore, PdkForm, PdkFormFieldComponent, PdkGridComponent, PdkInput, PdkResizeDirective, PdkTextInput } from "@cpp/pdk";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'dates-to-avoid-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <pdk-grid container>
      <pdk-grid two-thirds>
        <form pdk-form (validSubmit)="formSubmit.emit(form.value.datesToAvoid)" #form="ngForm">
          <pdk-form-field
            label="Enter dates this case shouldn't be listed or write 'none'."
            [errorMessages]="errorMessages"
          >
            <textarea
              pdk-resize
              minRows="10"
              pdk-input
              name="datesToAvoid"
              pdk-text-input
              required
              [ngModel]="kase.datesToAvoid"
            >
            </textarea>
          </pdk-form-field>

          <button type="submit" pdk-button pdk-margin-vertical="5">
            Submit
          </button>
          <div>
            <a href="javascript:void(0)" pdk-link unvisited routerLink="../" pdk-margin-vertical="5">Cancel</a>
          </div>
        </form>
      </pdk-grid>
    </pdk-grid>
  `,
    imports: [PdkGridComponent, PdkFormFieldComponent, FormsModule, PdkCore, PdkForm, PdkButtonDirective, PdkTextInput, PdkInput, PdkResizeDirective, RouterLink]
})
export class DatesToAvoidFormComponent {
  public readonly errorMessages = [
    {
      rule: 'required',
      message: 'Dates to avoid cannot be blank'
    }
  ];

  @Input() kase: Case;
  @Output() formSubmit = new EventEmitter<string>();
}
