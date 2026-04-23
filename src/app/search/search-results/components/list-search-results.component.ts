import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';
import {
  PdkInsetTextComponent,
  PdkWarningTextComponent,
  PdkTable,
  PdkCore,
  PdkForm,
  PdkSelectComponent,
  PdkButton,
  SelectOption
} from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { DatePipe, NgPlural, NgPluralCase } from '@angular/common';
import { CaseStatusPipe } from '../../../shared/pipes/case-status/case-status.pipe';
import { DefendantNamePipe } from '../../../shared/pipes/defendant-name/defendant-name.pipe';
import { FormsModule } from '@angular/forms';
import { PROSECUTOR_DEFAULT_VALUE } from '../../search.selectors';

@Component({
  selector: 'list-search-results',
  imports: [
    PdkInsetTextComponent,
    PdkWarningTextComponent,
    PdkTable,
    PdkCore,
    RouterLink,
    NgPlural,
    NgPluralCase,
    CaseStatusPipe,
    DefendantNamePipe,
    DatePipe,
    PdkForm,
    PdkButton,
    FormsModule,
    PdkSelectComponent
  ],
  template: `
    @if (prosecutorOptions().length > minProsecutorCount) {
    <form pdk-form (validSubmit)="filterResults(form.value)" #form="ngForm">
      <pdk-form-field label="Filter by prosecutor">
        <pdk-select
          id="prosecutor"
          name="prosecutor"
          [ngModel]="appliedFilter()"
          [options]="prosecutorOptions()"
          required
        >
        </pdk-select>
        <button pdk-margin-left="2" pdk-button type="submit">Filter</button>
      </pdk-form-field>
    </form>
    } @if (filteredResults()) {
    <pdk-inset-text pdk-margin-top="6">
      {{ filteredResults().length }}
      <span [ngPlural]="filteredResults().length">
        <ng-template ngPluralCase="=1">result</ng-template>
        <ng-template ngPluralCase="other">results</ng-template>
      </span>
      available @if (areDefendantDetailsUpdated()) {
      <pdk-warning-text pdk-margin-top="2">Cases with updated defendant name</pdk-warning-text>
      }
    </pdk-inset-text>
    } @if (filteredResults()?.length) {
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Name</th>
          <th pdk-table-header>Case reference number</th>
          <th pdk-table-header>Case status</th>
          <th pdk-table-header>Prosecutor</th>
          <th pdk-table-header>Date of birth</th>
          <th pdk-table-header>Notice served</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        @for (result of filteredResults(); track result.caseId) {
        <tr pdk-table-row>
          <td pdk-table-cell>
            @if (result.defendant.outdated) {
            <pdk-warning-text pdk-margin-top="5">
              <a href="javascript:void(0)" pdk-link [routerLink]="['../../case-overview', result.caseId]">
                <b>{{ result.defendant | defendantName }}</b>
              </a>
            </pdk-warning-text>
            } @else {
            <a href="javascript:void(0)" pdk-link [routerLink]="['../../case-overview', result.caseId]">
              <b>{{ result.defendant | defendantName }}</b>
            </a>
            }
          </td>
          <td pdk-table-cell data-role="urn">{{ result.urn }}</td>
          <td pdk-table-cell>
            {{ result.status | caseStatus }}
            @if (result.status === 'REFERRED_FOR_COURT_HEARING' && !result.listedInCriminalCourts) {
            <div pdk-typography="body-small">
              Awaiting Listing
            </div>
            }
          </td>
          <td pdk-table-cell>{{ result.prosecutingAuthority }}</td>
          <td pdk-table-cell class="no-wrap">{{ result.defendant.dateOfBirth | date: 'dd MMM yyyy' }}</td>
          <td pdk-table-cell class="no-wrap">{{ result.postingDate | date: 'dd MMM yyyy' }}</td>
        </tr>
        }
      </tbody>
    </table>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSearchResultsComponent {
  readonly prosecutorFilterDefaultValue = PROSECUTOR_DEFAULT_VALUE;
  readonly minProsecutorCount = 0;

  searchResults = input<CaseDetails[]>([]);
  prosecutorOptions = input<SelectOption[]>([]);

  appliedFilter = signal<string>(this.prosecutorFilterDefaultValue);

  areDefendantDetailsUpdated = computed(() => {
    return this.filteredResults().some(({ defendant }) => !!defendant.outdated);
  });

  filteredResults = computed(() => {
    const list = this.searchResults();
    const prosecutor = this.appliedFilter();

    if (prosecutor === this.prosecutorFilterDefaultValue) {
      return list;
    }

    return list.filter(item => item.prosecutingAuthority === prosecutor);
  });

  filterResults({ prosecutor }: { prosecutor: string }) {
    this.appliedFilter.set(prosecutor);
  }
}
