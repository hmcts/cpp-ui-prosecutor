import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Breadcrumb } from '../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../shared/breadcrumb-links/breadcrumb-links.constant';
import { NgForm } from '@angular/forms';
import { RegionState } from '../core/reducers/entities.reducer';

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
    <span *ngIf="pleadedNotGuiltyCasesDetail.count > 0; else noNotGuiltyPleaCases">
      <span>
        <h4 pdk-section="large">
          <pdk-warning-text>
            These cases will be reviewed by a legal adviser after you have sent your dates to avoid or after 10
            days from plea entry whichever is sooner
          </pdk-warning-text>
          <pdk-divider></pdk-divider>
        </h4>
      </span>
      <pdk-grid container>
        <pdk-grid one-half>
          <form pdk-form (validSubmit)="setRegion.emit(form.value.selectedRegion)">
            <label pdk-label>Filter by region</label>
            <div style="display: inline-flex">
              <pdk-select
                [ngModel]="region?.selectedRegion"
                [options]="region?.regions"
                name="selectedRegion"
                required
              >
              </pdk-select>
              <pdk-form-group>
                <button pdk-button pdk-margin-left="2" type="submit">Filter</button>
              </pdk-form-group>
            </div>
          </form>
        </pdk-grid>
      </pdk-grid>
      <table pdk-table *ngIf="pleadedNotGuiltyCasesDetail.cases.length > 0; else noNotGuiltyPleaCases">
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
          <tr pdk-table-row *ngFor="let pleadedNotGuiltyCase of pleadedNotGuiltyCasesDetail.cases">
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
              {{ pleadedNotGuiltyCase.dateOfBirth | date: 'dd MMM yyyy' }}
            </td>
            <td pdk-table-cell>
              {{ pleadedNotGuiltyCase.pleaEntry | date: 'dd MMM yyyy' }}
            </td>
          </tr>
        </tbody>
      </table>
    </span>
    <ng-template #noNotGuiltyPleaCases>
      <h4 pdk-section="large">
        <pdk-warning-text>
          There are no cases to review
        </pdk-warning-text>
        <pdk-divider></pdk-divider>
      </h4>
    </ng-template>
    <button pdk-button="" type="button" routerLink="/">Back to home</button>
  `
})
export class ReviewNotGuiltyPleasComponent {
  @ViewChild(NgForm) form: NgForm;
  @Input() pleadedNotGuiltyCasesDetail;
  @Input() region: RegionState;
  @Output() setRegion = new EventEmitter();
  @Output() viewCase = new EventEmitter();
  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.REVIEW_NOT_GUILTY_PLEAS];
}
