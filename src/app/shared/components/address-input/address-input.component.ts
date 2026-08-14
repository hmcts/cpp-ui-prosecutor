import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Injector, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  NgForm,
  NgControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  Validator,
  ValidationErrors,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { FormFieldControl, generateId, PdkForm, PdkFormComponent, PdkCheckboxComponent, PdkErrorMessageComponent, PdkCore, PdkTextInputDirective, PdkFormFieldComponent, PdkFormGroupComponent, PdkLabelDirective, PdkFormGroupDirective, PdkTextInput } from '@cpp/pdk';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Address } from '../../../../app/core';

interface FormElement {
  name: string;
  required: boolean;
  label: string;
  length: number;
}

// tslint:disable-next-line:max-line-length
const POSTCODE_REGEX = /^(([gG][iI][rR] {0,}0[aA]{2})|(([aA][sS][cC][nN]|[sS][tT][hH][lL]|[tT][dD][cC][uU]|[bB][bB][nN][dD]|[bB][iI][qQ][qQ]|[fF][iI][qQ][qQ]|[pP][cC][rR][nN]|[sS][iI][qQ][qQ]|[iT][kK][cC][aA]) {0,}1[zZ]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yxA-HK-XY]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) [0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9].*/;
const EMPTY_ADDRESS_OBJ = {
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  address5: '',
  postcode: ''
} as Address;
const DEFAULT_REQUIRED_FIELDS = ['address1', 'postcode'];
const DEFAULT_OPTIONAL_FIELDS = ['address2', 'address3', 'address4', 'address5'];
const ALL_FIELDS_ARRAY = ['address1', 'address2', 'address3', 'address4', 'address5', 'postode'];

const defaultErrorMessages = (validatedFormElements: string[], customErrorMessage?: string) => {
  const elements = (validatedFormElements && [...validatedFormElements]) || ['address1'];
  const message = !customErrorMessage
    ? elements.filter(element => element !== 'postcode').length === 1
      ? 'Enter at least one line of address'
      : 'Provide this information'
    : customErrorMessage;
  return [
    {
      rule: 'addressRequired',
      message
    },
    {
      rule: 'address1SpecialChar',
      message: 'Address line 1 can only start with letters or numbers'
    },
    {
      rule: 'postcodeRequired',
      message: 'Postcode must be in the right format with a space, for example AB1 2CD'
    },
    {
      rule: 'postcodeFormat',
      message: 'Postcode must be in the right format with a space, for example AB1 2CD'
    }
  ];
};

@Component({
    selector: 'input-address',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (showFixedAbode) {
      <pdk-form-field>
        <pdk-checkbox
          data-role="no-fixed-abode"
          name="noFixedAbode"
          [value]="true"
          [ngModel]="noFixedAbode"
          (change)="toggleFixedAbode($event)"
          pdk-margin-bottom="2"
        >
          No fixed abode
        </pdk-checkbox>
      </pdk-form-field>
    }
    
    <div [formGroup]="address" pdk-margin-bottom="6">
      @for (formItem of formElements; track trackByFn(formItem.name); let i = $index) {
        <pdk-form-group [hasError]="getHasError(formItem.name)">
          <label [for]="'address-control-' + identifier + '-' + formItem.name" pdk-label="small" pdk-margin-top="6">
            {{ formItem.label }}
          </label>
          @if (getHasError(formItem.name)) {
            <pdk-error-message
              [id]="'address-error-' + identifier + '-' + formItem.name"
              [errors]="getErrors(formItem.name)"
              [errorMessages]="errorMessages"
              >
            </pdk-error-message>
          }
          <input
            [id]="'address-control-' + identifier + '-' + formItem.name"
            type="text"
            [required]="formItem.required"
            [name]="formItem.name"
            [maxlength]="formItem.length"
            [class.form-control-error]="getHasError(formItem.name)"
            [formControlName]="formItem.name"
            [readonly]="readonly"
            class="form-control"
            pdk-text-input
            pdk-input
          />

        </pdk-form-group>
      }
    </div>
    `,
    providers: [
        {
            provide: FormFieldControl,
            useExisting: AddressInputComponent
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AddressInputComponent),
            multi: true
        }
    ],
    imports: [PdkCore, PdkForm, PdkCheckboxComponent, PdkErrorMessageComponent, PdkTextInputDirective, FormsModule, ReactiveFormsModule, PdkFormFieldComponent, PdkFormGroupComponent, PdkForm, PdkLabelDirective, PdkFormGroupDirective, PdkTextInput]
})
export class AddressInputComponent
  implements OnInit, ControlValueAccessor, FormFieldControl, Validator, OnDestroy, OnChanges {
  private pdkForm = inject(PdkFormComponent, { optional: true })!;
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  @Input() id: string;
  @Input() ariaDescribedBy: string | null;
  @Input() isRequired: boolean;
  @Input() maxLength?: number;
  @Input() showFixedAbode = false;
  @Input() validWhenEmpty = true;
  @Input() customErrorMessage?: string;
  @Input() validatedFormElements?: string[] = DEFAULT_REQUIRED_FIELDS;
  @Input() labelWithOptionalText?: string[] = DEFAULT_OPTIONAL_FIELDS;

  @Output() addressChange = new EventEmitter<boolean>();

  isOriginallyRequired: boolean;
  subscription$ = new Subject<boolean>();
  formElements: FormElement[];
  address: FormGroup;
  controlType = 'address';
  errorMessages = [];
  validateFields: boolean;
  readonly = false;
  noFixedAbode = false;
  identifier = generateId();

  errors: ValidationErrors | null;
  multi = true;

  private propagateChange = (_: any) => {};

  constructor() {
    const cdr = this.cdr;
    const fb = inject(FormBuilder);
    const ngForm = inject(NgForm);

    this.address = fb.group(EMPTY_ADDRESS_OBJ);

    this.address.valueChanges.pipe(takeUntil(this.subscription$)).subscribe((val: any) => {
      this.propagateChange(val);
    });

    (ngForm.ngSubmit as any).subscribe(() => {
      this.errors = this.ngControl.errors;
      this.removePdkErrors();
      if (this.errors) {
        this.addPdkErrors();
      }
      cdr.markForCheck();
      this.pdkForm.emitErrors(false);
    });
  }

  trackByFn(index) {
    return index;
  }

  ngOnInit(): void {
    this.isOriginallyRequired = this.isRequired.valueOf();
    this.errorMessages = defaultErrorMessages(this.validatedFormElements, this.customErrorMessage);
    this.setUpdateFormElements();
    this.onChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isRequired && changes.isRequired.previousValue !== changes.isRequired.currentValue) {
      this.isOriginallyRequired = this.isRequired.valueOf();
      this.setUpdateFormElements();
    } else {
      (this.formElements || []).forEach(e => {
        this.address.get(e.name).setValidators([Validators.required]);
        this.address.get(e.name).updateValueAndValidity();
      });
    }
  }

  private onChanges(): void {
    this.address.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged(), takeUntil(this.subscription$))
      .subscribe(value => {
        const isAddressEmpty = this.isAddressEmpty(value);
        if (!this.isOriginallyRequired) {
          if (!isAddressEmpty && !this.isRequired) {
            this.isRequired = true;
            this.validatedFormElements = DEFAULT_REQUIRED_FIELDS;
            this.labelWithOptionalText = DEFAULT_OPTIONAL_FIELDS;
            this.setUpdateFormElements();
          } else if (isAddressEmpty) {
            this.isRequired = false;
            this.validatedFormElements = [];
            this.labelWithOptionalText = ALL_FIELDS_ARRAY;
            this.setUpdateFormElements();
          }
        }
        this.addressChange.emit(true);
      });
  }

  private isAddressEmpty(a: Address): boolean {
    const concatAddress = `${a.address1}${a.address2}${a.address3}${a.address4}${a.address5}${a.postcode}`;
    return concatAddress.length === 0;
  }

  private setOptionalLabel(): void {
    if (this.isRequired) {
      (this.labelWithOptionalText || []).forEach(optional => {
        const i = this.formElements.findIndex(e => e.name === optional);
        if (i > -1) {
          this.formElements[i].label = this.formElements[i].label + ' (optional)';
        }
      });
    } else {
      (this.formElements || []).forEach(elem => (elem.label = elem.label + ' (optional)'));
    }
  }

  private setUpdateFormElements(): void {
    this.formElements = [
      {
        name: 'address1',
        required: this.isRequired,
        label: 'Address line 1',
        length: this.maxLength || 50
      },
      {
        name: 'address2',
        required: this.isRequired,
        label: 'Address line 2',
        length: this.maxLength || 50
      },
      {
        name: 'address3',
        required: this.isRequired,
        label: 'Address line 3',
        length: this.maxLength || 50
      },
      {
        name: 'address4',
        required: this.isRequired,
        label: 'Address line 4',
        length: this.maxLength || 50
      },
      {
        name: 'address5',
        required: this.isRequired,
        label: 'Address line 5',
        length: this.maxLength || 50
      },
      {
        name: 'postcode',
        required: this.isRequired,
        label: 'Postcode',
        length: 8
      }
    ];
    this.setOptionalLabel();
    if (this.errors) {
      (Object.keys(this.errors) || []).forEach(error => {
        if (this.errors[error]) {
          delete this.errors[error];
        }
      });
    }

    (this.formElements || []).forEach(e => {
      this.address.get(e.name).setValidators([Validators.required]);
      this.address.get(e.name).updateValueAndValidity();
    });
    this.cdr.markForCheck();
  }

  toggleFixedAbode(value: any): void {
    const blankAddress = EMPTY_ADDRESS_OBJ;

    this.noFixedAbode = value.checked;
    this.readonly = value.checked;

    if (this.noFixedAbode) {
      blankAddress.address1 = 'No fixed abode';
      this.address.patchValue(blankAddress);

      this.validatedFormElements.forEach(e => {
        this.address.get(e).setValidators([]);
        this.address.get(e).updateValueAndValidity();
      });
    } else {
      this.address.patchValue(blankAddress);

      this.validatedFormElements.forEach(e => {
        this.address.get(e).setValidators([Validators.required]);
        this.address.get(e).updateValueAndValidity();
      });
    }
  }

  get ngControl(): NgControl {
    return this.injector.get(NgControl);
  }

  getErrors(controlName: string): ValidationErrors {
    return ((this.errors && Object.keys(this.errors)) || []).reduce((errors, errorKey) => {
      if (this.errors[errorKey] && controlName in this.errors[errorKey]) {
        return { ...errors, [errorKey]: this.errors[errorKey] };
      } else {
        return errors;
      }
    }, {} as ValidationErrors);
  }

  getHasError(controlName: string): boolean {
    return (
      this.errors &&
      ((this.errors.addressRequired && this.errors.addressRequired[controlName]) ||
        (this.errors.address1SpecialChar && this.errors.address1SpecialChar[controlName]) ||
        (this.errors.postcodeRequired && this.errors.postcodeRequired[controlName]) ||
        (this.errors.postcodeFormat && this.errors.postcodeFormat[controlName]))
    );
  }

  registerOnChange = (fn: (_: any) => {}): void => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched() {}

  validate(c: FormControl): ValidationErrors | null {
    // treat an empty value as valid so that the input can be optional
    if (!c.value && this.validWhenEmpty) {
      return null;
    }

    const addressLinesToValidate = this.validatedFormElements || ['address1'];
    const addressRequired = this.reduceErrors(
      addressLinesToValidate,
      addressField => addressField !== 'postcode',
      controlName => this.address.controls[controlName].valid
    );

    // First character of address line 1 must be alphanumeric
    const address1SpecialChar = this.reduceErrors(
      ['address1'],
      addressField => addressField === 'address1',
      controlName => {
        const value = this.address.controls[controlName].value;
        return !value || ALPHANUMERIC_REGEX.test(value);
      }
    );

    // Separate required validation for postcode because it has a different required error message to other address lines
    const postcodeToValidate = this.validatedFormElements || [];
    const postcodeRequired = this.reduceErrors(
      postcodeToValidate,
      addressField => addressField === 'postcode',
      controlName => this.address.controls[controlName].valid
    );

    const postcodeFormat = this.reduceErrors(
      ['postcode'],
      addressField => addressField === 'postcode',
      controlName => {
        const value = this.address.controls[controlName].value;
        return !value || POSTCODE_REGEX.test(value);
      }
    );
    if (addressRequired || address1SpecialChar || postcodeRequired || postcodeFormat) {
      return { addressRequired, address1SpecialChar, postcodeRequired, postcodeFormat };
    }

    return null;
  }

  writeValue(address: any) {
    if (address) {
      if (this.showFixedAbode) {
        this.noFixedAbode = address.address1 === 'No fixed abode';
        this.readonly = this.noFixedAbode;

        if (this.noFixedAbode) {
          this.validatedFormElements.forEach(e => {
            this.address.get(e).setValidators([]);
            this.address.get(e).updateValueAndValidity();
          });
        } else {
          this.validatedFormElements.forEach(e => {
            this.address.get(e).setValidators([Validators.required]);
            this.address.get(e).updateValueAndValidity();
          });
        }
      }
      this.address.patchValue(address);
    }
  }

  private addPdkErrors(): void {
    // todo - this needs to be revisited
    Object.keys(this.pdkForm['externalErrors'])
      .filter(key => key.startsWith(`address-control`))
      .forEach(key => this.pdkForm.removeError(key));

    Object.keys(this.errors).forEach(error => {
      if (this.errors[error]) {
        const errorControlName = Object.keys(this.address.controls).find(
          controlName => this.errors[error][controlName]
        );
        if (errorControlName) {
          this.pdkForm.addExternalError(`address-control-${this.identifier}-${errorControlName}`, {
            id: `address-error-${this.identifier}-${errorControlName}`,
            message: this.getErrorMessage(error)
          });
        }
      }
    });
  }

  private reduceErrors(
    fieldsToValidate: string[],
    filter: (addressField) => {},
    test: (controlName: string) => boolean
  ): boolean | ValidationErrors {
    return fieldsToValidate
      .filter(fieldToValidate => filter.call(this, fieldToValidate))
      .reduce((errors: { [k: string]: ValidationErrors | null }, controlName) => {
        if (!test.call(this, controlName)) {
          return {
            ...(errors || {}),
            [controlName]: true
          };
        }
        return errors;
      }, null);
  }

  private removePdkErrors(): void {
    this.formElements.forEach(element => {
      this.pdkForm.removeError(`address-control-${this.identifier}-${element.name}`);
    });
  }

  private getErrorMessage(error): string {
    return this.errorMessages.find(message => message.rule === error).message;
  }

  ngOnDestroy(): void {
    this.subscription$.next(true);
    this.subscription$.complete();
    this.subscription$.unsubscribe();
    if (this.errors) {
      this.removePdkErrors();
      this.pdkForm.emitErrors(true);
    }
  }
}
