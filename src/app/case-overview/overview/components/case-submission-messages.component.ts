import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case } from '../../../contexts/sjp';
import { PdkAlertComponent, PdkCore } from "@cpp/pdk";

@Component({
    selector: 'case-submission-messages',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (displayOffencesWithdrawnBanner) {
      <pdk-alert type="confirmation" [icon]="true" pdk-margin-top="3">
        Your request has been sent
      </pdk-alert>
    }
    @if (!displayDatesToAvoidUpdateFailedBanner && kase.assigned) {
      <pdk-alert
        type="warning"
        [icon]="true"
        pdk-margin-vertical="1"
        >
        This case is view–only, as a legal adviser is working on it.
      </pdk-alert>
    }
    @if (kase.completed) {
      <pdk-alert type="warning" [icon]="true" pdk-margin-vertical="1">
        You can't edit this case because it has already been completed.
      </pdk-alert>
    }
    @if (kase.assigned && displayDatesToAvoidUpdateFailedBanner) {
      <pdk-alert
        type="warning"
        [icon]="true"
        pdk-margin-vertical="1"
        >
        The case has been assigned to a session and dates to avoid can't be added.
      </pdk-alert>
    }
    `,
    imports: [PdkCore, PdkAlertComponent]
})
export class CaseSubmissionMessagesComponent {
  @Input() kase: Case;
  @Input() displayOffencesWithdrawnBanner: boolean;
  @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
}
