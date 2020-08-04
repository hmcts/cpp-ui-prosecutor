import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OnlinePleaUi } from '../online-plea-interface';

@Component({
  selector: 'online-plea-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="3">Defendant’s online plea</h1>
    <p pdk-typography="body-medium" pdk-margin-bottom="8">
      Submitted online on {{ onlinePlea.submittedOn | formatDate: 'd MMMM y' }} at
      {{ onlinePlea.submittedOn | formatDate: 'h:mma' }}
    </p>
    <h3 pdk-typography="heading-medium" pdk-margin-bottom="0">Personal details</h3>
    <table pdk-table>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Name</td>
          <td pdk-table-cell pdk-typography="body-small">{{ onlinePlea?.personalDetails | firstLastName: false }}</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Address</td>
          <td pdk-table-cell pdk-typography="body-small" class="pre-line">
            {{ onlinePlea.personalDetails.address | formatAddress: '\\n' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Home telephone</td>
          <td pdk-table-cell pdk-typography="body-small">
            {{ onlinePlea?.personalDetails?.homeTelephone | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Mobile number</td>
          <td pdk-table-cell pdk-typography="body-small">{{ onlinePlea?.personalDetails?.mobile | ifEmpty: '–' }}</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Email address</td>
          <td pdk-table-cell pdk-typography="body-small">{{ onlinePlea?.personalDetails?.email | ifEmpty: '–' }}</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Date of birth</td>
          <td pdk-table-cell pdk-typography="body-small">
            <date-of-birth [dateOfBirth]="onlinePlea?.personalDetails?.dateOfBirth"></date-of-birth>
          </td>
        </tr>
        <ng-container *ngIf="onlinePlea?.personalDetails?.hasDriverLicense">
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Do they have a GB driving licence?</td>
            <td pdk-table-cell pdk-typography="body-small" data-locator="hasUkLicense">
              {{ !!onlinePlea?.personalDetails?.hasUkDriverLicense | yesNo }}
            </td>
          </tr>
          <tr pdk-table-row *ngIf="onlinePlea?.personalDetails?.hasUkDriverLicense; else nonUkDriverLicense">
            <td pdk-table-cell pdk-typography="body-small">GB driving licence number</td>
            <td pdk-table-cell pdk-typography="body-small" data-locator="ukLicense">
              {{ onlinePlea?.personalDetails?.driverNumber }}
            </td>
          </tr>
          <ng-template #nonUkDriverLicense>
            <tr pdk-table-row>
              <td pdk-table-cell pdk-typography="body-small">What kind of driving licence they hold</td>
              <td pdk-table-cell pdk-typography="body-small" data-locator="nonUkLicense">
                {{ onlinePlea?.personalDetails?.driverLicenceDetails }}
              </td>
            </tr>
          </ng-template>
        </ng-container>
      </tbody>
    </table>

    <ng-container *ngFor="let onlinePleaDetail of onlinePlea.onlinePleaDetails; let index = index">
      <h3 pdk-typography="heading-medium" pdk-margin-bottom="0">Plea for offence {{ index + 1 }}</h3>
      <table pdk-table>
        <tbody pdk-table-body class="column-width">
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Charge</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePleaDetail.offenceTitle | ifEmpty: '–' }}</td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">How they pleaded</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePleaDetail.plea | pleaStatus }}</td>
          </tr>
          <tr pdk-table-row *ngIf="onlinePlea.pleaDetails.comeToCourt !== undefined">
            <td pdk-table-cell pdk-typography="body-small">Would they like to come to court?</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePlea?.pleaDetails?.comeToCourt | yesNo }}</td>
          </tr>
          <tr pdk-table-row *ngIf="onlinePleaDetail.pleasGuilty">
            <td pdk-table-cell pdk-typography="body-small">Guilty plea mitigation</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePleaDetail.mitigation | ifEmpty: '–' }}</td>
          </tr>
          <tr pdk-table-row *ngIf="!onlinePleaDetail.pleasGuilty">
            <td pdk-table-cell pdk-typography="body-small">Why do they believe they’re not guilty?</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePleaDetail.notGuiltyBecause | ifEmpty: '–' }}</td>
          </tr>
        </tbody>
      </table>
    </ng-container>

    <ng-container *ngIf="onlinePlea.pleaDetails.hasHearing">
      <h3 pdk-typography="heading-medium" pdk-margin-bottom="0">Court hearing</h3>
      <table pdk-table>
        <tbody pdk-table-body class="column-width">
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Are they bringing their own witness?</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePlea?.pleaDetails?.doHaveOwnWitness | yesNo }}</td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Their witness’ details</td>
            <td pdk-table-cell pdk-typography="body-small">
              {{ onlinePlea?.pleaDetails?.witnessDetails | ifEmpty: '–' }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Are there any dates they can not attend court?</td>
            <td pdk-table-cell pdk-typography="body-small">
              {{ onlinePlea?.pleaDetails?.existsUnavailability | yesNo }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Dates they can’t attend court</td>
            <td pdk-table-cell pdk-typography="body-small">
              {{ onlinePlea?.pleaDetails?.unavailability | ifEmpty: '–' }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Do they need an Interpreter?</td>
            <td pdk-table-cell pdk-typography="body-small">
              {{ onlinePlea?.pleaDetails?.interpreterRequired | yesNo }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Language</td>
            <td pdk-table-cell pdk-typography="body-small">
              {{ onlinePlea?.pleaDetails?.interpreterLanguage | ifEmpty: '–' }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Deduct from earnings?</td>
            <td pdk-table-cell pdk-typography="body-small">
              {{ onlinePlea?.pleaDetails?.deductFromEarnings | yesNo }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Do they wish to speak Welsh?</td>
            <td pdk-table-cell pdk-typography="body-small">{{ onlinePlea?.pleaDetails?.speakWelsh | yesNo }}</td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Do they have disability or accessibility needs?</td>
            <td pdk-table-cell pdk-typography="body-small" data-locator="disabilityNeedsRequired">
              {{ onlinePlea?.pleaDetails?.disabilityNeeds?.needed | yesNo }}
            </td>
          </tr>
          <tr pdk-table-row>
            <td pdk-table-cell pdk-typography="body-small">Disability or accessibility needs</td>
            <td pdk-table-cell pdk-typography="body-small" data-locator="disabilityNeeds">
              {{ onlinePlea?.pleaDetails?.disabilityNeeds?.disabilityNeeds | ifEmpty: '–' }}
            </td>
          </tr>
        </tbody>
      </table>
    </ng-container>
  `,
  styles: [
    `
      .column-width td {
        width: 50%;
      }
    `
  ]
})
export class OnlinePleaDetailsComponent {
  @Input() onlinePlea: OnlinePleaUi;
}
