import { map } from 'rxjs/operators';
import { Component, ElementRef, EventEmitter, forwardRef, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors
} from '@angular/forms';
import { FormFieldControl, PdkFormFieldComponent, PdkInput, PdkInputComponent, PdkTextInputDirective } from '@cpp/pdk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



let i = 0;

const minutesPerHour = 60;

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'estimateFormat',
    message: `Time not recognised, use this format, for example 1 5 15`
  },
  {
    rule: 'minMinutesEstimate',
    message: `Estimate is too low - you must enter at least {{expected}} {{suffix}}`
  }
];

@Component({
    selector: 'estimate-input',
    templateUrl: './estimate-input.component.html',
    styleUrls: ['./estimate-input.component.scss'],
    providers: [
        {
            provide: FormFieldControl,
            useExisting: EstimateInputComponent
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EstimateInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EstimateInputComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [PdkFormFieldComponent, PdkInputComponent, FormsModule, ReactiveFormsModule, PdkTextInputDirective, PdkInput]
})
export class EstimateInputComponent implements ControlValueAccessor, FormFieldControl, Validator, OnInit, OnChanges {
  private injector = inject(Injector);

  // tslint:disable-next-line: no-input-rename
  @Input('aria-describedby') ariaDescribedBy: string;

  // simulate blur and focus events as if this were a single input
  @Output() fieldBlur = new EventEmitter();
  @Output() fieldFocus = new EventEmitter();

  // hour / week configuration
  @Input() hoursPerDay: number;
  @Input() daysPerWeek: number;

  @Input() minMinutesValue: number;

  weeksEnabled = false;
  daysEnabled = false;
  hoursEnabled = false;

  id: string;
  controlType = 'estimate';
  multi = true;
  estimateInputs: FormGroup;
  canBlur = false;
  hasFocus = false;
  errorMessages = DEFAULT_ERROR_MESSAGES;

  minutesPerDay: number;
  minutesPerWeek: number;

  private propagateChange = (_: any) => {};

  constructor() {
    const elementRef = inject(ElementRef);

    i += 1;

    const el = elementRef.nativeElement;

    this.weeksEnabled = el.hasAttribute('weeks-enabled');
    this.daysEnabled = el.hasAttribute('days-enabled');
    this.hoursEnabled = el.hasAttribute('hours-enabled');

    this.id = `estimate-input-${i}`;
    this.estimateInputs = new FormGroup({
      minutes: new FormControl('')
    });

    if (this.weeksEnabled) {
      this.estimateInputs.addControl('weeks', new FormControl(''));
    }
    if (this.daysEnabled) {
      this.estimateInputs.addControl('days', new FormControl(''));
    }
    if (this.hoursEnabled) {
      this.estimateInputs.addControl('hours', new FormControl(''));
    }

    // obtain the composite value from the three inner inputs in order to
    // simulate a date being typed in a single field - the combined value is
    // considered to exist when any of the three inner inputs are set
    this.estimateInputs.valueChanges
      .pipe(
        map(({ weeks, days, hours, minutes }) => {
          if (weeks || days || hours || minutes) {
            return (
              this.minutesPerWeek * Number(weeks || 0) +
              this.minutesPerDay * Number(days || 0) +
              minutesPerHour * Number(hours || 0) +
              (Number(minutes) || 0)
            );
          }
          return undefined;
        })
      )
      .subscribe(val => this.propagateChange(val));
  }

  get ngControl(): NgControl {
    return this.injector.get(NgControl);
  }

  ngOnInit() {
    this.minutesPerDay = minutesPerHour * (this.hoursPerDay || 6);
    this.minutesPerWeek = this.minutesPerDay * (this.daysPerWeek || 7);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.minutesPerDay && changes.minutesPerDay.currentValue !== changes.minutesPerDay.previousValue) {
      this.minutesPerDay = minutesPerHour * (changes.minutesPerDay.currentValue || 24);
    }
    if (changes.daysPerWeek && changes.daysPerWeek.currentValue !== changes.daysPerWeek.previousValue) {
      this.minutesPerWeek = this.minutesPerDay * (changes.daysPerWeek.currentValue || 7);
    }
  }

  getAriaDescribedbyFor(controlName: string): string | null {
    if (controlName === 'weeks') {
      return this.ariaDescribedBy;
    }
    if (controlName === 'days' && !this.weeksEnabled) {
      return this.ariaDescribedBy;
    }
    if (controlName === 'hours' && !this.weeksEnabled && !this.daysEnabled) {
      return this.ariaDescribedBy;
    }
    // tslint:disable-next-line
    if (controlName === 'minutes' && !this.weeksEnabled && !this.daysEnabled && !this.hoursEnabled) {
      return this.ariaDescribedBy;
    }
    return null;
  }

  getErrors(control: string) {
    if (this.estimateInputs.controls[control] && this.estimateInputs.controls[control].errors) {
      return Object.keys(this.estimateInputs.controls[control].errors).map(key => ({
        rule: key,
        message: ''
      }));
    }
    return null;
  }

  handleBlurInput($event) {
    this.canBlur = true;
    setTimeout(() => {
      if (this.canBlur) {
        this.fieldBlur.emit($event);
        this.hasFocus = false;
      }
    });
  }

  handleFocusInput($event) {
    if (!this.hasFocus) {
      this.fieldFocus.emit($event);
      this.hasFocus = true;
    }
    this.canBlur = false;
  }

  registerOnChange = (fn: (_: any) => {}) => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched() {}

  validate(c: FormControl): ValidationErrors | null {
    // treat an empty value as valid so that the input can be optional
    if (c.value === undefined) {
      return null;
    }

    const estimateFormat = this.validateFormat();
    if (estimateFormat) {
      return { estimateFormat };
    }
    const minMinutesEstimate = this.validateMinimumMinutes(c);
    if (minMinutesEstimate) {
      return minMinutesEstimate;
    }
    return null;
  }

  validateMinimumMinutes(c: FormControl): { [k: string]: ValidationErrors | null } | null {
    if (this.minMinutesValue && c.value < this.minMinutesValue) {
      return {
        minMinutesEstimate: {
          expected: this.minMinutesValue,
          actual: c.value,
          suffix: this.minMinutesValue === 1 ? 'minute' : 'minutes'
        }
      };
    }
    return null;
  }

  validateFormat(): { [k: string]: ValidationErrors | null } | null {
    // expose any internal validation errors to the outer control under the
    // `estimateFormat` key
    return ['weeks', 'days', 'hours', 'minutes'].reduce(
      (errors: { [k: string]: ValidationErrors | null }, controlName) => {
        const control = this.estimateInputs.controls[controlName];

        if (control && !control.valid) {
          return {
            ...(errors || {}),
            [controlName]: control.errors
          };
        }
        return errors;
      },
      null
    );
  }

  writeValue(totalMinutes: number) {
    if (!!!totalMinutes) {
      this.estimateInputs.patchValue({
        weeks: undefined,
        days: undefined,
        hours: undefined,
        minutes: undefined
      });

      return;
    }

    let weeks;
    let days;
    let hours;
    let minutes;
    let remainingMinutes = totalMinutes;

    if (this.weeksEnabled) {
      weeks = Math.floor(remainingMinutes / this.minutesPerWeek) || undefined;
      remainingMinutes = remainingMinutes % this.minutesPerWeek;
    }
    if (this.daysEnabled) {
      days = Math.floor(remainingMinutes / this.minutesPerDay) || undefined;
      remainingMinutes = remainingMinutes % this.minutesPerDay;
    }
    if (this.hoursEnabled) {
      hours = Math.floor(remainingMinutes / minutesPerHour) || undefined;
      remainingMinutes = remainingMinutes % minutesPerHour;
    }
    minutes = remainingMinutes || undefined;

    this.estimateInputs.patchValue({ weeks, days, hours, minutes });
  }
}
