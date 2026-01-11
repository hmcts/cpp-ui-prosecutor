import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { State, EthnicityCode, getObservedEthnicities, LoadObservedEthnicitiesAction } from '../../../../core';
import { coerceBooleanProperty, FormFieldControl, InputWidth, PdkAutosuggestLiteComponent } from '@cpp/pdk';
import { Observable, of, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ethnicity-code-auto-suggest',
  templateUrl: './ethnicity-code-auto-suggest.component.html',
  imports: [PdkAutosuggestLiteComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EthnicityCodeAutoSuggestComponent,
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: EthnicityCodeAutoSuggestComponent
    }
  ]
})
export class EthnicityCodeAutoSuggestComponent implements ControlValueAccessor, FormFieldControl, OnInit {
  private store = inject<Store<State>>(Store);

  multi = false;
  searchEthnicityCode$ = new Subject<string>();
  suggestions$: Observable<EthnicityCode[]>;
  @ViewChild(PdkAutosuggestLiteComponent)
  autoSuggestLiteRef: PdkAutosuggestLiteComponent<EthnicityCode>;
  @Input()
  suggestionKey: keyof EthnicityCode = 'ethnicityCode';
  @Input() suggestionLabel: keyof EthnicityCode = 'ethnicityDescription';
  @Input() ariaDescribedBy: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() hasError = false;
  @Input() id!: string;
  @Input() inputWidth: InputWidth;
  @Input() maxResult = 6;
  private _mapSelectionToKey: boolean;
  private _getEthnicityCodeOnMount: boolean;
  private fetchEthnicity$: Observable<EthnicityCode[]>;
  @Input() additonalFilterBy: (ethnicity: EthnicityCode) => boolean = () => true;
  propagateChange = (_: EthnicityCode | string) => {};

  @Input()
  get mapSelectionToKey() {
    return this._mapSelectionToKey;
  }

  set mapSelectionToKey(value: boolean) {
    this._mapSelectionToKey = coerceBooleanProperty(value);
  }

  @Input()
  get getEthnicityCodeOnMount() {
    return this._getEthnicityCodeOnMount;
  }

  set getEthnicityCodeOnMount(value: boolean) {
    this._getEthnicityCodeOnMount = coerceBooleanProperty(value);
  }

  get controlType() {
    return this.autoSuggestLiteRef.controlType;
  }

  get ngControl() {
    return this.autoSuggestLiteRef.ngControl;
  }

  constructor() {
    this.fetchEthnicity$ = this.store.pipe(
      select(getObservedEthnicities),
      filter(ethnicityCodes => !!ethnicityCodes)
    );

    this.suggestions$ = this.searchEthnicityCode$.pipe(
      map(q => (q || '').toLocaleLowerCase().trim()),
      switchMap(q => {
        if (q) {
          return this.fetchEthnicity$.pipe(
            take(1),
            map(ethnicityCodes =>
              ethnicityCodes
                .filter(
                  ethnicityCode =>
                    this.additonalFilterBy(ethnicityCode) &&
                    ethnicityCode.ethnicityDescription.toLowerCase().includes(q)
                )
                .slice(0, Math.max(this.maxResult, 10))
            )
          );
        }
        return of([]);
      }),
      startWith([])
    );
  }

  ngOnInit() {
    if (this.getEthnicityCodeOnMount) {
      this.store.dispatch(new LoadObservedEthnicitiesAction());
    }
  }

  writeValue(value: EthnicityCode | string): void {
    if (value && typeof value === 'string') {
      this.fetchEthnicity$
        .pipe(
          take(1),
          filter(ethnicityCodes => ethnicityCodes.length > 0)
        )
        .subscribe(ethnicityCodes => {
          const ethnicityCode = ethnicityCodes.find(ethnicity => ethnicity[this.suggestionKey] === value);
          this.propagateChange(ethnicityCode);
          this.autoSuggestLiteRef.writeValue(ethnicityCode);
        });
    } else {
      this.autoSuggestLiteRef.writeValue(value as EthnicityCode);
    }
  }

  registerOnChange(changeFn: (ethnicityCode: EthnicityCode | string) => void): void {
    if (!this.mapSelectionToKey) {
      this.propagateChange = changeFn.bind(this);
    } else {
      const fn = (ethnicityCode: EthnicityCode) => {
        const value = ethnicityCode && ethnicityCode[this.suggestionKey];
        return changeFn(value);
      };
      this.propagateChange = fn.bind(this);
    }

    this.autoSuggestLiteRef.registerOnChange(this.propagateChange);
  }

  registerOnTouched(fn: any): void {}
}
