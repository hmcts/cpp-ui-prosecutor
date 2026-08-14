import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Breadcrumb } from '../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../shared/breadcrumb-links/breadcrumb-links.constant';
import { FormsModule, NgForm } from '@angular/forms';
import { RegionState } from '../core/reducers/entities.reducer';
import { BreadcrumbLinksComponent } from '../shared/breadcrumb-links/breadcrumb-links.component';
import {
  PdkButtonDirective,
  PdkCore,
  PdkDividerComponent,
  PdkForm,
  PdkFormGroupComponent,
  PdkGridComponent,
  PdkSelectComponent,
  PdkTable,
  PdkWarningTextComponent,
  SelectOption
} from '@cpp/pdk';
import { DatePipe, NgPlural, NgPluralCase } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DefendantNamePipe } from '../shared/pipes/defendant-name/defendant-name.pipe';
import { FormatAddressPipe } from '../shared/pipes/format-address/format-address.pipe';
import { SetFilterPayload } from '../core';
import { PleadedNotGuiltyCaseResult } from '../contexts/sjp';

@Component({
  selector: 'review-not-guilty-pleas',
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs"></breadcrumb-links>
    <h2 pdk-section="large">
      Review not guilty pleas ({{ pleadedNotGuiltyCasesDetail.count }}
      <span [ngPlural]="pleadedNotGuiltyCasesDetail.count">
        <ng-template ngPluralCase="=1">case</ng-template>
        <ng-template ngPluralCase="other">cases</ng-template> </span
      >)
    </h2>
    @if (pleadedNotGuiltyCasesDetail.count > 0) {
    <span>
      <span>
        <h4 pdk-section="large">
          <pdk-warning-text>
            These cases will be reviewed by a legal adviser after you have sent your dates to avoid or after 10 days
            from plea entry whichever is sooner
          </pdk-warning-text>
          <pdk-divider></pdk-divider>
        </h4>
      </span>
      <pdk-grid container>
        <pdk-grid one-half>
          <form pdk-form (validSubmit)="setFilter.emit(form.value)">
            <div style="display: inline-flex">
              @if (prosecutorOptions.length > minProsecutorCount) {
              <pdk-form-field label="Filter by prosecutor" pdk-margin-right="2">
                <pdk-select [ngModel]="region?.prosecutor" [options]="prosecutorOptions" name="prosecutor" required>
                </pdk-select>
              </pdk-form-field>
              }
              <pdk-form-field label="Filter by region">
                <pdk-select
                  [ngModel]="region?.selectedRegion"
                  [options]="region?.regions"
                  name="selectedRegion"
                  required
                >
                </pdk-select>
              </pdk-form-field>
              <pdk-form-group style="align-content: end">
                <button pdk-button pdk-margin-left="2" type="submit">Filter</button>
              </pdk-form-group>
            </div>
          </form>
        </pdk-grid>
      </pdk-grid>
      @if (pleadedNotGuiltyCasesDetail.cases.length > 0) {
      <table pdk-table>
        <thead pdk-table-head>
          <tr pdk-table-row>
            <th pdk-table-header>Name</th>
            <th pdk-table-header>Address</th>
            <th pdk-table-header>Reference Number</th>
            <th pdk-table-header>Region</th>
            <th pdk-table-header>Date of birth</th>
            <th pdk-table-header>Plea entry</th>
          </tr>
        </thead>
        <tbody pdk-table-body>
          @for (pleadedNotGuiltyCase of pleadedNotGuiltyCasesDetail.cases; track pleadedNotGuiltyCase.caseId) {
          <tr pdk-table-row>
            <td pdk-table-cell>
              <a href="javascript:void(0)" pdk-link (click)="viewCase.emit(pleadedNotGuiltyCase.caseId)">
                <b>{{ pleadedNotGuiltyCase | defendantName: false }}</b>
              </a>
            </td>
            <td pdk-table-cell class="pre-line">
              {{ pleadedNotGuiltyCase.address | formatAddress: '\\n' }}
            </td>
            <td pdk-table-cell data-role="urn">
              {{ pleadedNotGuiltyCase.referenceNumber }}
            </td>
            <td pdk-table-cell data-role="region">
              {{ pleadedNotGuiltyCase.region }}
            </td>
            <td pdk-table-cell>
              {{ !!pleadedNotGuiltyCase.dateOfBirth ? (pleadedNotGuiltyCase.dateOfBirth | date: 'dd MMM yyyy') : '' }}
            </td>
            <td pdk-table-cell>
              {{ pleadedNotGuiltyCase.pleaEntry | date: 'dd MMM yyyy' }}
            </td>
          </tr>
          }
        </tbody>
      </table>
      } @else {
      <h4 pdk-section="large">
        <pdk-warning-text>
          There are no cases to review
        </pdk-warning-text>
        <pdk-divider></pdk-divider>
      </h4>
      }
    </span>
    } @else {
    <h4 pdk-section="large">
      <pdk-warning-text>
        There are no cases to review
      </pdk-warning-text>
      <pdk-divider></pdk-divider>
    </h4>
    }
    <button pdk-button="" type="button" routerLink="/">Back to home</button>
  `,
  imports: [
    BreadcrumbLinksComponent,
    PdkWarningTextComponent,
    PdkDividerComponent,
    PdkGridComponent,
    PdkSelectComponent,
    PdkFormGroupComponent,
    NgPlural,
    NgPluralCase,
    DefendantNamePipe,
    DatePipe,
    FormatAddressPipe,
    FormsModule,
    RouterLink,
    PdkTable,
    PdkForm,
    PdkCore,
    PdkButtonDirective
  ]
})
export class ReviewNotGuiltyPleasComponent {
  readonly minProsecutorCount = 2;
  @ViewChild(NgForm) form: NgForm;
  @Input() pleadedNotGuiltyCasesDetail: PleadedNotGuiltyCaseResult;
  @Input() region: RegionState;
  @Input() prosecutorOptions: SelectOption[] = [];
  @Output() setFilter = new EventEmitter<SetFilterPayload>();
  @Output() viewCase = new EventEmitter();
  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.REVIEW_NOT_GUILTY_PLEAS];
}
