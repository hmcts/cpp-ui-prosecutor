import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { State, Ethnicity, getEthnicities, LoadEthnicitiesAction } from '../../../../core';
import { coerceBooleanProperty, FormFieldControl, InputWidth, PdkAutosuggestLiteComponent } from '@cpp/pdk';
import { Observable, of, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ethnicity-auto-suggest',
  templateUrl: './ethnicity-auto-suggest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EthnicityAutoSuggestComponent,
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: EthnicityAutoSuggestComponent
    }
  ],
  imports: [PdkAutosuggestLiteComponent, AsyncPipe]
})
export class EthnicityAutoSuggestComponent implements ControlValueAccessor, FormFieldControl, OnInit {
  private store = inject<Store<State>>(Store);

  multi = false;
  searchEthnicity$ = new Subject<string>();
  suggestions$: Observable<Ethnicity[]>;
  private _mapSelectionToKey: boolean;
  private _getEthnicitiesOnMount: boolean;
  private fetchEthnicity$: Observable<Ethnicity[]>;
  @ViewChild(PdkAutosuggestLiteComponent)
  autoSuggestLiteRef: PdkAutosuggestLiteComponent<Ethnicity>;
  @Input()
  suggestionKey: keyof Ethnicity = 'id';
  @Input() suggestionLabel: keyof Ethnicity = 'description';
  @Input() ariaDescribedBy: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() hasError = false;
  @Input() id!: string;
  @Input() inputWidth: InputWidth;
  @Input() maxResult = 6;
  @Input() additonalFilterBy: (ethnicity: Ethnicity) => boolean = () => true;
  propagateChange = (_: Ethnicity | string) => {};

  @Input()
  get mapSelectionToKey() {
    return this._mapSelectionToKey;
  }

  set mapSelectionToKey(value: boolean) {
    this._mapSelectionToKey = coerceBooleanProperty(value);
  }

  @Input()
  get getEthnicitiesOnMount() {
    return this._getEthnicitiesOnMount;
  }

  set getEthnicitiesOnMount(value: boolean) {
    this._getEthnicitiesOnMount = coerceBooleanProperty(value);
  }

  get controlType() {
    return this.autoSuggestLiteRef.controlType;
  }

  get ngControl() {
    return this.autoSuggestLiteRef.ngControl;
  }

  constructor() {
    this.fetchEthnicity$ = this.store.pipe(
      select(getEthnicities),
      filter(ethnicityList => !!ethnicityList)
    );

    this.suggestions$ = this.searchEthnicity$.pipe(
      map(q => (q || '').toLocaleLowerCase().trim()),
      switchMap(q => {
        if (q) {
          return this.fetchEthnicity$.pipe(
            take(1),
            map(ethnicityList =>
              ethnicityList
                .filter(
                  ethnicity => this.additonalFilterBy(ethnicity) && ethnicity.description.toLowerCase().includes(q)
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
    if (this.getEthnicitiesOnMount) {
      this.store.dispatch(new LoadEthnicitiesAction());
    }
  }

  writeValue(value: Ethnicity | string): void {
    if (value && typeof value === 'string') {
      this.fetchEthnicity$
        .pipe(
          take(1),
          filter(ethnicityList => ethnicityList.length > 0)
        )
        .subscribe(ethnicityList => {
          const selectedEthnicity = ethnicityList.find(ethnicity => ethnicity[this.suggestionKey] === value);
          this.propagateChange(selectedEthnicity);
          this.autoSuggestLiteRef.writeValue(selectedEthnicity);
        });
    } else {
      this.autoSuggestLiteRef.writeValue(value as Ethnicity);
    }
  }

  registerOnChange(changeFn: (ethnicity: Ethnicity | string) => void): void {
    if (!this.mapSelectionToKey) {
      this.propagateChange = changeFn.bind(this);
    } else {
      const fn = (ethnicity: Ethnicity) => {
        const value = ethnicity && (ethnicity[this.suggestionKey] as string);
        return changeFn(value);
      };
      this.propagateChange = fn.bind(this);
    }

    this.autoSuggestLiteRef.registerOnChange(this.propagateChange);
  }

  registerOnTouched(fn: any): void {}
}
