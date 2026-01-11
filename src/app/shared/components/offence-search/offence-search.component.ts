import {
  Component,
  forwardRef,
  Injector,
  Input,
  ChangeDetectorRef,
  OnInit,
  inject,
  input,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import { filter, map, switchMap, throttleTime, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  FormFieldControl,
  PdkAutosuggestComponent,
  PdkTextColorDirective,
  PdkCore,
  PdkGridComponent,
  PdkTypographyDirective,
  PdkColor
} from '@cpp/pdk';
import { OffenceType } from '../../../core';
import { PCFReferenceDataOffenceService } from '../../../contexts/reference-data/pcf-reference-data-offence';
import { AsyncPipe } from '@angular/common';

let i = 1;

const coerceBooleanProperty = (value: any): boolean => {
  return value != null && `${value}` !== 'false';
};

const generateId = () => {
  return `offence-search-${i++}`;
};

interface OffenceTypeAutoSuggestion {
  label: string;
  offence: OffenceType;
  id: string;
}

@Component({
  selector: 'offence-search',
  imports: [
    PdkAutosuggestComponent,
    PdkTextColorDirective,
    PdkCore,
    PdkTypographyDirective,
    AsyncPipe,
    PdkGridComponent
  ],
  styleUrls: ['./offence-search.scss'],
  templateUrl: 'offence-search.component.html',
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => OffenceSearchComponent)
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OffenceSearchComponent),
      multi: true
    }
  ]
})
export class OffenceSearchComponent implements ControlValueAccessor, FormFieldControl, OnInit {
  private injector = inject(Injector);
  referenceDataOffenceService = inject(PCFReferenceDataOffenceService);

  @Input() id: string = generateId();
  @Input() ariaDescribedBy: string | null = null;
  readonly selectedOffenceCode = input<string>(undefined);
  readonly offenceDate = input('');

  @Input()
  get required() {
    return this._required;
  }
  set required(req: any) {
    this._required = coerceBooleanProperty(req);
  }

  readonly autoSuggest = viewChild<PdkAutosuggestComponent>('autosuggest');

  noResult = false;
  controlType = 'autosuggest';
  hasError = false;
  input$ = new Subject<any>();
  multi = false;
  selected: OffenceType;
  source$ = new Subject<OffenceTypeAutoSuggestion[]>();

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(value: string) {
    if (!value) {
      this.source$.next([]);
    }
    this._inputValue = value;
    this.noResult = false;
  }
  _required: boolean;
  _inputValue: string;

  propagateChange: (_: any) => void = (_: any) => {};

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const ngForm = inject(NgForm);
    const referenceDataOffenceService = this.referenceDataOffenceService;

    this.input$
      .pipe(
        tap(text => (this.inputValue = text)),
        filter(text => text.length > 2),
        throttleTime(250),
        switchMap(text => referenceDataOffenceService.searchOffenceTypes(text, 10, this.offenceDate())),
        tap(offences => {
          if (!offences || offences.length === 0) {
            this.noResult = true;
            return;
          }
          this.noResult = false;
        }),
        // In order to ensure that the auto suggest does not populate the value of the input we must transform the label to
        // an empty string as this is part of the requirement. This behaviour is undesirable in the
        // case of this component, where the selected offence is profiled in a separate
        // component, so we instead make an empty label available to the TypeaheadMatch
        // so as to clear the input upon selection
        map(offences =>
          offences.map(offence => ({
            label: '',
            id: offence.offenceId,
            offence
          }))
        )
      )
      .subscribe(this.source$);
    (ngForm as any).ngSubmit.subscribe(() => {
      this.hasError = Boolean(this.ngControl.errors);

      changeDetectorRef.markForCheck();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      const selectedOffenceCode = this.selectedOffenceCode();
      if (selectedOffenceCode) {
        this.referenceDataOffenceService.searchOffenceTypes(selectedOffenceCode, 10, '').subscribe(x => {
          this.selected = x[0];
          this.propagateChange(this.selected);
        });
      }
    });
  }

  get ngControl() {
    return this.injector.get(NgControl);
  }

  getKey(option: OffenceTypeAutoSuggestion) {
    if (option.offence) {
      return option.offence.offenceId;
    }
  }

  getLabel(option: OffenceTypeAutoSuggestion) {
    return option.label;
  }

  getTextColour(defaultColor: PdkColor, highlighted: boolean): PdkColor {
    return highlighted ? 'white' : defaultColor;
  }

  getMatchedTitle<U extends keyof OffenceType>(suggestion: OffenceType, key: U): string {
    if (suggestion && key in suggestion) {
      const label = suggestion[key];
      if (this.inputValue.length > 0 && label) {
        const offset = this.inputValue.length;
        const idx = label.toLowerCase().indexOf(this.inputValue.toLowerCase());
        if (idx !== -1) {
          return (
            `${label.substring(0, idx)}<b>${label.substring(idx, idx + offset)}</b>` +
            `${label.substring(idx + offset)}`
          );
        }
      }
      return label;
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn.bind(this);
    fn = (offenceTypeAutoSuggestion: OffenceTypeAutoSuggestion) => {
      if (offenceTypeAutoSuggestion) {
        this.selected = offenceTypeAutoSuggestion.offence;
        this.propagateChange(this.selected);
      }
    };
    this.autoSuggest().registerOnChange(fn);
  }

  registerOnTouched(fn: any) {}

  writeValue(): void {}
}
