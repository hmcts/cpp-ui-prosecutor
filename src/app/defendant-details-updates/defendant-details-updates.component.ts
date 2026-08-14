import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AcknowledgeDefendantDetailsUpdatesParam, DefendantDetailsUpdatesResult } from '../contexts/sjp';
import { Breadcrumb } from '../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../shared/breadcrumb-links/breadcrumb-links.constant';
import { RegionState } from '../core/reducers/entities.reducer';
import { FormsModule, NgForm } from '@angular/forms';
import { BreadcrumbLinksComponent } from '../shared/breadcrumb-links/breadcrumb-links.component';
import {
  PdkButtonDirective,
  PdkCore,
  PdkDividerComponent,
  PdkForm,
  PdkFormGroupComponent,
  PdkGrid,
  PdkInsetTextComponent,
  PdkSelectComponent,
  PdkTable,
  PdkWarningTextComponent,
  SelectOption
} from '@cpp/pdk';
import { DatePipe, NgPlural, NgPluralCase } from '@angular/common';
import { WhatChangedComponent } from './what-changed/what-changed.component';
import { DefendantNamePipe } from '../shared/pipes/defendant-name/defendant-name.pipe';
import { RouterLink } from '@angular/router';
import { SetFilterPayload } from '../core';

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
      updates @if (defendantDetailsUpdates.total > 50) {
      <span>(first 50 shown below)</span>
      }
    </pdk-inset-text>
    <pdk-grid container>
      <pdk-grid one-half>
        <form pdk-form (validSubmit)="setFilter.emit(form.value)">
          <div style="display: inline-flex">
            @if (prosecutorOptions.length > minNumberOfProsecutor) {
            <pdk-form-field label="Filter by prosecutor" pdk-margin-right="2">
              <pdk-select [ngModel]="region?.prosecutor" [options]="prosecutorOptions" name="prosecutor" required>
              </pdk-select>
            </pdk-form-field>
            }
            <pdk-form-field label="Filter by region">
              <pdk-select [ngModel]="region?.selectedRegion" [options]="region?.regions" name="selectedRegion" required>
              </pdk-select>
            </pdk-form-field>
            <pdk-form-group style="align-content: end">
              <button pdk-button pdk-margin-left="2" type="submit">Filter</button>
            </pdk-form-group>
          </div>
        </form>
      </pdk-grid>
    </pdk-grid>
    @if (defendantDetailsUpdates.defendantDetailsUpdates.length > 0) {
    <table pdk-table id="cases">
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Name</th>
          <th pdk-table-header>Case reference number</th>
          <th pdk-table-header>Prosecutor</th>
          <th pdk-table-header>Region</th>
          <th pdk-table-header>Date of birth</th>
          <th pdk-table-header>What changed?</th>
          <th pdk-table-header>Updated on</th>
          <th pdk-table-header>Remove from list</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        @for (defendantDetailsUpdate of defendantDetailsUpdates.defendantDetailsUpdates; let i = $index; track i) {
        <tr pdk-table-row>
          <td pdk-table-cell data-role="defendant-name">
            <a href="javascript:void(0)" pdk-link (click)="viewCase.emit(defendantDetailsUpdate.caseId)">
              <b>{{ defendantDetailsUpdate | defendantName: false }}</b>
            </a>
          </td>
          <td pdk-table-cell data-role="urn">
            {{ defendantDetailsUpdate.caseUrn }}
          </td>
          <td pdk-table-cell data-role="urn">
            {{ defendantDetailsUpdate.prosecutingAuthority ?? '–' }}
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
                acknowledgeDefendantDetailsUpdate(defendantDetailsUpdate.caseId, defendantDetailsUpdate.defendantId)
              "
              >Remove</a
            >
          </td>
        </tr>
        }
      </tbody>
    </table>
    } @else {
    <h4 pdk-section="large">
      <pdk-warning-text>
        There are no cases with defendant detail updates
      </pdk-warning-text>
      <pdk-divider></pdk-divider>
    </h4>
    }
    <button id="back-button" pdk-button routerLink="/">
      Back to home
    </button>
  `,
  imports: [
    PdkCore,
    PdkForm,
    PdkTable,
    PdkButtonDirective,
    BreadcrumbLinksComponent,
    PdkInsetTextComponent,
    PdkGrid,
    PdkSelectComponent,
    PdkFormGroupComponent,
    WhatChangedComponent,
    PdkWarningTextComponent,
    PdkDividerComponent,
    NgPlural,
    NgPluralCase,
    DatePipe,
    DefendantNamePipe,
    FormsModule,
    RouterLink,
    PdkButtonDirective
  ]
})
export class DefendantDetailsUpdatesComponent {
  readonly minNumberOfProsecutor = 2;

  @ViewChild(NgForm, { static: true }) form: NgForm;
  @Input() defendantDetailsUpdates: DefendantDetailsUpdatesResult;
  @Input() region: RegionState;
  @Input() prosecutorOptions: SelectOption[] = [];
  @Output() setFilter = new EventEmitter<SetFilterPayload>();
  @Output() acknowledgeDefendantDetailsUpdatesEmitter = new EventEmitter<AcknowledgeDefendantDetailsUpdatesParam>();
  @Output() viewCase = new EventEmitter();

  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.DEFENDANT_DETAILS_UPDATES];

  acknowledgeDefendantDetailsUpdate(caseId: string, defendantId: string) {
    const param: AcknowledgeDefendantDetailsUpdatesParam = { caseId, defendantId };
    this.acknowledgeDefendantDetailsUpdatesEmitter.emit(param);
  }
}
