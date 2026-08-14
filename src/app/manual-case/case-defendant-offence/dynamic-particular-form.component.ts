import {
  Component,
  Input,
  ViewChild,
  forwardRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { flatten } from 'lodash';
import { ControlValueAccessor, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ValidationError,
  PdkFormFieldComponent,
  PdkSelectComponent,
  PdkDateInputComponent,
  PdkRadioGroupComponent,
  PdkRadioButtonComponent,
  PdkForm,
  PdkCore,
  PdkTextInput,
  PdkInput,
  PdkButtonDirective,
  PdkResizeDirective
} from '@cpp/pdk';
import { Element, ElementType, OffenceWordingMessage } from '../../core/model/manual-case';
import { FormListOption } from '../../core/model/court-document';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
// The entirety of this component needs
// a complete rewrite. it is difficult to maintain in my opinion
@Component({
  selector: 'dynamic-particular-form',
  templateUrl: './dynamic-particular-form.component.html',
  styles: [
    `
      .radio-container {
        margin-top: 2px;
        margin-left: 48px;
      }
      .dynamic-label {
        margin-top: -10px;
        margin-bottom: 15px;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicParticularFormComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdkFormFieldComponent,
    PdkSelectComponent,
    PdkDateInputComponent,
    PdkRadioGroupComponent,
    PdkRadioButtonComponent,
    TranslateModule,
    FormsModule,
    PdkForm,
    PdkCore,
    PdkTextInput,
    PdkInput,
    PdkButtonDirective,
    PdkSelectComponent,
    PdkResizeDirective
  ]
})
export class DynamicParticularFormComponent implements ControlValueAccessor, OnChanges {
  private cdr = inject(ChangeDetectorRef);

  @Input() arrestDateValue: string;
  @Input() offenceDateTypes: FormListOption[];
  @Input() offenceWording: string;
  @Output() formError = new EventEmitter<ValidationError[] | any>();
  @ViewChild(NgForm) form: NgForm;
  errors: ValidationError[] = [];
  data: OffenceWordingMessage;
  isEditMode = true;
  onChange = (_: OffenceWordingMessage) => {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes.offenceWording &&
      changes.offenceWording.currentValue &&
      changes.offenceWording.currentValue.indexOf('**') > -1
    ) {
      this.isEditMode = true;
    }
  }

  optionSelect(list: Element[]) {
    const optionControls = flatten(list.map(d => d.children));

    optionControls
      .filter((el: Element) => el && el.type === ElementType.Text && el.value)
      .forEach((el: Element) => {
        el.value = '';
      });
  }

  onOffenceDateTypeChange(event, index: number) {
    const dateSection = this.data.sections.find((section, i) => section.type === 'DATE' && i > index);
    if (+event.value !== 4) {
      dateSection.showValueTwoElement = false;
      delete dateSection.valueTwo;
    } else {
      dateSection.showValueTwoElement = true;
    }
  }

  submitData() {
    this.onChange(this.data);
    this.isEditMode = false;
  }

  writeValue(data: OffenceWordingMessage): void {
    this.data = data;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: OffenceWordingMessage) => void) {
    this.onChange = fn;
  }

  registerOnTouched(_: unknown) {}

  async triggerFormSubmit() {
    return new Promise<boolean>(resolve => {
      this.form.ngSubmit.emit();
      resolve(this.form.valid);
    });
  }
}
