import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { State, getNationalities, LoadNationalitiesAction, Nationality } from '../../../../core';
import { coerceBooleanProperty, FormFieldControl, InputWidth, PdkAutosuggestLiteComponent } from '@cpp/pdk';
import { Observable, of, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'nationality-auto-suggest',
  templateUrl: './nationality-auto-suggest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NationalityAutoSuggestComponent,
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: NationalityAutoSuggestComponent
    }
  ],
  imports: [PdkAutosuggestLiteComponent, AsyncPipe]
})
export class NationalityAutoSuggestComponent implements ControlValueAccessor, FormFieldControl, OnInit {
  private store = inject<Store<State>>(Store);

  multi = false;
  searchNationality$ = new Subject<string>();
  suggestions$: Observable<Nationality[]>;
  @ViewChild(PdkAutosuggestLiteComponent)
  autoSuggestLiteRef: PdkAutosuggestLiteComponent<Nationality>;
  private _mapSelectionToKey = false;
  private _getNationalitiesOnMount = false;
  private fetchNationality$: Observable<Nationality[]>;
  @Input() suggestionKey: keyof Nationality = 'id';
  @Input() suggestionLabel: keyof Nationality = 'nationality';
  @Input() ariaDescribedBy: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() hasError = false;
  @Input() id!: string;
  @Input() inputWidth: InputWidth;
  @Input() maxResult = 6;
  @Input() additonalFilterBy: (nationality: Nationality) => boolean = () => true;
  propagateChange = (_: Nationality | string) => {};

  @Input()
  get mapSelectionToKey() {
    return this._mapSelectionToKey;
  }

  set mapSelectionToKey(value: boolean) {
    this._mapSelectionToKey = coerceBooleanProperty(value);
  }

  @Input()
  get getNationalitiesOnMount() {
    return this._getNationalitiesOnMount;
  }

  set getNationalitiesOnMount(value: boolean) {
    this._getNationalitiesOnMount = coerceBooleanProperty(value);
  }

  get controlType() {
    return this.autoSuggestLiteRef.controlType;
  }

  get ngControl() {
    return this.autoSuggestLiteRef.ngControl;
  }

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.fetchNationality$ = this.store.pipe(
      select(getNationalities),
      filter(nationalities => !!nationalities)
    );

    this.suggestions$ = this.searchNationality$.pipe(
      map(q => (q || '').toLocaleLowerCase().trim()),
      switchMap(q => {
        if (q) {
          return this.fetchNationality$.pipe(
            take(1),
            map(nationalities =>
              nationalities
                .filter(
                  nationality =>
                    this.additonalFilterBy(nationality) && nationality.nationality.toLowerCase().includes(q)
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
    if (this.getNationalitiesOnMount) {
      this.store.dispatch(new LoadNationalitiesAction());
    }
  }

  writeValue(value: Nationality | string): void {
    if (value && typeof value === 'string') {
      this.fetchNationality$
        .pipe(
          filter(nationalities => nationalities.length > 0),
          take(1)
        )
        .subscribe(nationalities => {
          const nationality = nationalities.find(nat => nat[this.suggestionKey] === value);
          this.propagateChange(nationality);
          this.autoSuggestLiteRef.writeValue(nationality);
        });
    } else {
      this.autoSuggestLiteRef.writeValue(value as Nationality);
    }
  }

  registerOnChange(changeFn: (ethnicityCode: Nationality | string) => void): void {
    if (!this.mapSelectionToKey) {
      this.propagateChange = changeFn.bind(this);
    } else {
      const fn = (nationality: Nationality) => {
        const value = nationality && (nationality[this.suggestionKey] as string);
        return changeFn(value);
      };
      this.propagateChange = fn.bind(this);
    }

    this.autoSuggestLiteRef.registerOnChange(this.propagateChange);
  }

  registerOnTouched(fn: any): void {}
}
