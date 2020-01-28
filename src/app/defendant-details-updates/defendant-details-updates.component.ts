import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AcknowledgeDefendantDetailsUpdatesParam} from '../contexts/sjp';

@Component({
  selector: 'defendant-details-updates',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Defendant details updates
      </li>
    </ol>

    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">
      Defendant details updates
    </h1>

    <pdk-inset-text>
      <span id="updates-count">{{ defendantDetailsUpdates.total }}</span>&nbsp;
      <span [ngPlural]="defendantDetailsUpdates.total">
        <ng-template ngPluralCase="=1">case has</ng-template>
        <ng-template ngPluralCase="other">cases have</ng-template>
      </span>
      updates
      <span *ngIf="defendantDetailsUpdates.total > 50">(first 50 shown below)</span>
    </pdk-inset-text>

    <table pdk-table *ngIf="defendantDetailsUpdates.total > 0" id="cases">
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
          <a href="javascript:void(0)" pdk-link [routerLink]="['../case-overview', defendantDetailsUpdate.caseId]">
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
          {{ defendantDetailsUpdate.dateOfBirth | date: 'dd MMM yyyy' }}
        </td>
        <td pdk-table-cell>
          <what-changed [defendantDetailsUpdate]="defendantDetailsUpdate"></what-changed>
        </td>
        <td pdk-table-cell data-role="updated-on">
          {{ defendantDetailsUpdate.updatedOn | date: 'dd MMM yyyy' }}
        </td>
        <td pdk-table-cell>
          <a href="javascript:void(0)" pdk-link data-role="remove-link"
             (click)="acknowledgeDefendendantDetailsUpdate(defendantDetailsUpdate.caseId, defendantDetailsUpdate.defendantId)">Remove</a>
        </td>
      </tr>
      </tbody>
    </table>
    <button id="back-button" pdk-button routerLink="../">
      Back to home
    </button>
  `
})
export class DefendantDetailsUpdatesComponent {
  @Input() defendantDetailsUpdates;
  @Output() acknowledgeDefendantDetailsUpdatesEmitter = new EventEmitter<AcknowledgeDefendantDetailsUpdatesParam>();

  acknowledgeDefendendantDetailsUpdate(caseId: string, defendantId: string) {
    const param: AcknowledgeDefendantDetailsUpdatesParam = {caseId, defendantId};
    this.acknowledgeDefendantDetailsUpdatesEmitter.emit(param);
  }
}
