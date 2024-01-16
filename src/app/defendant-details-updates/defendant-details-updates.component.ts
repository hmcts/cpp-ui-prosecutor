import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AcknowledgeDefendantDetailsUpdatesParam } from '../contexts/sjp';
import { Breadcrumb } from '../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../shared/breadcrumb-links/breadcrumb-links.constant';
import { RegionState } from '../core/reducers/entities.reducer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'defendant-details-updates',
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs" [showTitle]="true"></breadcrumb-links>
    <pdk-inset-text>
      <span id="updates-count">{{ defendantDetailsUpdates.total }}</span
      >&nbsp;
      <span [ngPlural]="defendantDetailsUpdates.total">
        <ng-template ngPluralCase="=1">case has</ng-template>
        <ng-template ngPluralCase="other">cases have</ng-template>
      </span>
      updates
      <span *ngIf="defendantDetailsUpdates.total > 50">(first 50 shown below)</span>
    </pdk-inset-text>
    <pdk-grid container>
      <pdk-grid one-half>
        <form pdk-form (validSubmit)="setRegion.emit(form.value.selectedRegion)">
          <label pdk-label>Filter by region</label>
          <div style="display: inline-flex">
            <pdk-select [ngModel]="region?.selectedRegion" [options]="region?.regions" name="selectedRegion" required>
            </pdk-select>
            <pdk-form-group>
              <button pdk-button pdk-margin-left="2" type="submit">Filter</button>
            </pdk-form-group>
          </div>
        </form>
      </pdk-grid>
    </pdk-grid>
    <table
      pdk-table
      *ngIf="defendantDetailsUpdates.defendantDetailsUpdates.length > 0; else noDefendantUpdates"
      id="cases"
    >
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Name</th>
          <th pdk-table-header>Case reference number</th>
          <th pdk-table-header>Region</th>
          <th pdk-table-header>Date of birth</th>
          <th pdk-table-header>What changed?</th>
          <th pdk-table-header>Updated on</th>
          <th pdk-table-header>Remove from list</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row *ngFor="let defendantDetailsUpdate of defendantDetailsUpdates.defendantDetailsUpdates">
          <td pdk-table-cell data-role="defendant-name">
            <a href="javascript:void(0)" pdk-link (click)="viewCase.emit(defendantDetailsUpdate.caseId)">
              <b>{{ defendantDetailsUpdate | defendantName: false }}</b>
            </a>
          </td>
          <td pdk-table-cell data-role="urn">
            {{ defendantDetailsUpdate.caseUrn }}
          </td>
          <td pdk-table-cell data-role="region">
            {{ defendantDetailsUpdate.region }}
          </td>
          <td pdk-table-cell data-role="date-of-birth">
            {{ !!defendantDetailsUpdate.dateOfBirth ? (defendantDetailsUpdate.dateOfBirth | date: 'dd MMM yyyy') : '' }}
          </td>
          <td pdk-table-cell>
            <what-changed [defendantDetailsUpdate]="defendantDetailsUpdate"></what-changed>
          </td>
          <td pdk-table-cell data-role="updated-on">
            {{ defendantDetailsUpdate.updatedOn | date: 'dd MMM yyyy' }}
          </td>
          <td pdk-table-cell>
            <a
              href="javascript:void(0)"
              pdk-link
              data-role="remove-link"
              (click)="
                acknowledgeDefendendantDetailsUpdate(defendantDetailsUpdate.caseId, defendantDetailsUpdate.defendantId)
              "
              >Remove</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <ng-template #noDefendantUpdates>
      <h4 pdk-section="large">
        <pdk-warning-text>
          There are no cases with defendant detail updates
        </pdk-warning-text>
        <pdk-divider></pdk-divider>
      </h4>
    </ng-template>
    <button id="back-button" pdk-button routerLink="/">
      Back to home
    </button>
  `
})
export class DefendantDetailsUpdatesComponent {
  @ViewChild(NgForm, { static: true }) form: NgForm;
  @Input() defendantDetailsUpdates;
  @Input() region: RegionState;
  @Output() setRegion = new EventEmitter();
  @Output() acknowledgeDefendantDetailsUpdatesEmitter = new EventEmitter<AcknowledgeDefendantDetailsUpdatesParam>();
  @Output() viewCase = new EventEmitter();
  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.DEFENDANT_DETAILS_UPDATES];

  acknowledgeDefendendantDetailsUpdate(caseId: string, defendantId: string) {
    const param: AcknowledgeDefendantDetailsUpdatesParam = { caseId, defendantId };
    this.acknowledgeDefendantDetailsUpdatesEmitter.emit(param);
  }
}
