import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../../contexts/sjp';

@Component({
  selector: 'case-submission-messages',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-alert *ngIf="displayOffencesWithdrawnBanner" type="confirmation" icon="true" pdk-margin-top="3">
      Your request has been sent
    </pdk-alert>
    <pdk-alert
      type="warning"
      icon="true"
      pdk-margin-vertical="1"
      *ngIf="!displayDatesToAvoidUpdateFailedBanner && kase.assigned"
    >
      This case is view–only, as a legal adviser is working on it.
    </pdk-alert>
    <pdk-alert type="warning" icon="true" pdk-margin-vertical="1" *ngIf="kase.completed">
      You can't edit this case because it has already been completed.
    </pdk-alert>
    <pdk-alert
      type="warning"
      icon="true"
      pdk-margin-vertical="1"
      *ngIf="kase.assigned && displayDatesToAvoidUpdateFailedBanner"
    >
      The case has been assigned to a session and dates to avoid can't be added.
    </pdk-alert>
  `
})
export class CaseSubmissionMessagesComponent {
  @Input() kase: Case;
  @Input() displayOffencesWithdrawnBanner: boolean;
  @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
}
