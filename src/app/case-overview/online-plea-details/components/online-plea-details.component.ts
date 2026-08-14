import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case, PleaType } from '../../../contexts/sjp';
import { OnlinePleaUi } from './../online-plea-interface';
import { Breadcrumb } from '../../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../../shared/breadcrumb-links/breadcrumb-links.constant';
import { UserGroup } from '@cpp/users-groups';
import { BreadcrumbLinksComponent } from '../../../shared/breadcrumb-links/breadcrumb-links.component';
import { CaseHeaderBadgeContainer } from '../../common/case-header-badge/case-header-badge.container';
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { DefendantNamePipe } from '../../../shared/pipes/defendant-name/defendant-name.pipe';
import { FormatAddressPipe } from '../../../shared/pipes/format-address/format-address.pipe';
import { IfEmptyPipe } from '../../../shared/pipes/if-empty/if-empty.pipe';
import { PleaStatusPipe } from '../../../shared/pipes/please-status/plea-status.pipe';
import { SjpCurrencyPipe } from '../../../shared/pipes/sjp-currency/sjp-currency.pipe';
import { YesNoPipe } from '../../../shared/pipes/yes-no/yes-no.pipe';
import { CurrencyPipe } from '@angular/common';
import { EmploymentStatusPipe } from '../../../shared/pipes/employment-status/employment-status.pipe';
import { DateOfBirthComponent } from '../../../shared/date-of-birth/date-of-birth.component';
import { PdkCore, PdkTable } from '@cpp/pdk';

@Component({
  selector: 'online-plea-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <breadcrumb-links [caseId]="kase.id" [breadcrumbs]="breadcrumbs"></breadcrumb-links>
    <case-header-badge-container></case-header-badge-container>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="3">Defendant’s online plea</h1>
    @for (onlinePlea of onlinePleas; track onlinePlea.caseId) {
    <p pdk-typography="body-medium" pdk-margin-bottom="8">
      Submitted online on {{ onlinePlea.submittedOn | formatDate: 'd MMMM y' }} at
      {{ onlinePlea.submittedOn | formatDate: 'h:mma' }}
    </p>
    @if (!!onlinePlea?.personalDetails) {
    <h2 pdk-typography="heading-medium" aria-hidden="true" pdk-margin-bottom="0">Personal details</h2>
    <table pdk-table>
      <caption class="pdk-visually-hidden">
        Personal details
      </caption>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Name</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="defendantName">
            {{ onlinePlea?.personalDetails | defendantName: false }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Address</td>
          <td pdk-table-cell pdk-typography="body-small" class="pre-line" data-locator="defendantAddress">
            {{ onlinePlea.personalDetails.address | formatAddress: '\\n' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Home telephone</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="homeTelephone">
            {{ onlinePlea?.personalDetails?.homeTelephone | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Mobile number</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="mobileNumber">
            {{ onlinePlea?.personalDetails?.mobile | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Email address</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="emailAddress">
            {{ onlinePlea?.personalDetails?.email | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Date of birth</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="dateOfBirth">
            <date-of-birth [dateOfBirth]="onlinePlea?.personalDetails?.dateOfBirth"></date-of-birth>
          </td>
        </tr>
        @if (onlinePlea?.personalDetails?.hasDriverLicense) {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Do they have a GB driving licence?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="hasUkLicense">
            {{ !!onlinePlea?.personalDetails?.hasUkDriverLicense | yesNo }}
          </td>
        </tr>
        @if (onlinePlea?.personalDetails?.hasUkDriverLicense) {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">GB driving licence number</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="ukLicense">
            {{ onlinePlea?.personalDetails?.driverNumber }}
          </td>
        </tr>
        } @else {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">What kind of driving licence they hold</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="nonUkLicense">
            {{ onlinePlea?.personalDetails?.driverLicenceDetails }}
          </td>
        </tr>
        } }
      </tbody>
    </table>
    } @if (!!onlinePlea?.onlinePleaLegalEntityDetails) {
    <h2 pdk-typography="heading-medium" aria-hidden="true" pdk-margin-bottom="0">Organisation details</h2>
    <table pdk-table>
      <caption class="pdk-visually-hidden">
        Organisation details
      </caption>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Name</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="defendantName">
            {{ onlinePlea?.onlinePleaLegalEntityDetails | defendantName: false }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Address</td>
          <td pdk-table-cell pdk-typography="body-small" class="pre-line" data-locator="defendantAddress">
            {{ onlinePlea.onlinePleaLegalEntityDetails.address | formatAddress: '\\n' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Home telephone</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="homeTelephone">
            {{ onlinePlea?.onlinePleaLegalEntityDetails?.homeTelephone | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Mobile number</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="mobileNumber">
            {{ onlinePlea?.onlinePleaLegalEntityDetails?.mobile | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Email address</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="emailAddress">
            {{ onlinePlea?.onlinePleaLegalEntityDetails?.email | ifEmpty: '–' }}
          </td>
        </tr>
      </tbody>
    </table>
    } @for (onlinePleaDetail of onlinePlea.onlinePleaDetails; track onlinePleaDetail.id; let index = $index) {
    <h2 pdk-typography="heading-medium" aria-hidden="true" pdk-margin-bottom="0">Plea for offence {{ index + 1 }}</h2>
    <table pdk-table>
      <caption class="pdk-visually-hidden">
        Plea for offence
        {{
          index + 1
        }}
      </caption>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Charge</td>
          <td pdk-table-cell pdk-typography="body-small" id="{{ 'offenceTitle_' + onlinePleaDetail.offenceId }}">
            {{ onlinePleaDetail.offenceTitle | ifEmpty: '–' }}
          </td>
        </tr>
        @if (!isAocpPendingOrCompleted(onlinePleaDetail.plea)) {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">How they pleaded</td>
          <td pdk-table-cell pdk-typography="body-small" id="{{ 'plea_' + onlinePleaDetail.offenceId }}">
            {{ onlinePleaDetail.plea | pleaStatus }}
          </td>
        </tr>
        } @if (onlinePlea.pleaDetails && onlinePlea.pleaDetails.comeToCourt !== undefined) {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Would they like to come to court?</td>
          <td pdk-table-cell pdk-typography="body-small" id="{{ 'wantToComeToCourt_' + onlinePleaDetail.offenceId }}">
            {{ onlinePlea?.pleaDetails?.comeToCourt | yesNo }}
          </td>
        </tr>
        } @if (onlinePleaDetail.pleasGuilty) {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Guilty plea mitigation</td>
          <td pdk-table-cell pdk-typography="body-small" id="{{ 'mitigation_' + onlinePleaDetail.offenceId }}">
            {{ onlinePleaDetail.mitigation | ifEmpty: '–' }}
          </td>
        </tr>
        } @if (!onlinePleaDetail.pleasGuilty && !isAocpPendingOrCompleted(onlinePleaDetail.plea)) {
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Why do they believe they’re not guilty?</td>
          <td pdk-table-cell pdk-typography="body-small" id="{{ 'notGuiltyBecause_' + onlinePleaDetail.offenceId }}">
            {{ onlinePleaDetail.notGuiltyBecause }}
          </td>
        </tr>
        }
      </tbody>
    </table>
    } @if (onlinePlea.aocpAccepted) {
    <h3 pdk-typography="heading-medium" pdk-margin-bottom="0">
      Dealing with your case
    </h3>
    } @if (onlinePlea.aocpAccepted) {
    <table pdk-table>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">How do they want us to deal with their case?</td>
          <td pdk-table-cell pdk-typography="body-small">
            Automatic conviction and standard penalty {{ kase?.aocpTotalCost | currency: 'GBP' }}
          </td>
        </tr>
      </tbody>
    </table>
    } @if (!onlinePlea.aocpAccepted && onlinePlea.pleaDetails.hasHearing) {
    <h3 pdk-typography="heading-medium" pdk-margin-bottom="0">
      Court hearing
    </h3>
    } @if (!onlinePlea.aocpAccepted && onlinePlea.pleaDetails.hasHearing) {
    <table pdk-table>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Are they bringing their own witness?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="doHaveOwnWitness">
            {{ onlinePlea?.pleaDetails?.doHaveOwnWitness | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Their witness’ details</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="witnessDetails">
            {{ onlinePlea?.pleaDetails?.witnessDetails | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Are there any dates they can not attend court?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="existsUnavailability">
            {{ onlinePlea?.pleaDetails?.existsUnavailability | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Dates they can’t attend court</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="unavailability">
            {{ onlinePlea?.pleaDetails?.unavailability | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Do they need an interpreter?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="interpreterRequired">
            {{ onlinePlea?.pleaDetails?.interpreterRequired | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Language</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="interpreterLanguage">
            {{ onlinePlea?.pleaDetails?.interpreterLanguage | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Do they wish to speak Welsh?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="speakWelsh">
            {{ onlinePlea?.pleaDetails?.speakWelsh | yesNo }}
          </td>
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
    } @if (!!onlinePlea?.personalDetails && shouldDisplayFinancialData()) { @if (!onlinePlea.aocpAccepted) {
    <h2 pdk-typography="heading-medium" aria-hidden="true" pdk-margin-bottom="0">
      Finances
    </h2>
    }
    <table pdk-table>
      <caption class="pdk-visually-hidden">
        Finances
      </caption>
      @if (!onlinePlea.aocpAccepted) {
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Would they like to give income or benefits details?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="wantGiveIncomeBenefitDetails">
            {{ onlinePlea?.employment?.wantGiveIncomeBenefitDetails | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">
            Do they have any outstanding Magistrates’ Court or Crown Court fines?
          </td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="outstandingFines">
            {{ onlinePlea?.pleaDetails?.outstandingFines | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Employment status</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="employment">
            {{ onlinePlea.employment | employmentStatus | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small" data-locator="incomeAfterTaxTypeLabel">
            {{ onlinePlea?.employment?.incomeAfterTaxType }} income (after tax)
          </td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="incomePaymentAmount">
            {{ onlinePlea?.employment?.incomePaymentAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Would they like to deduct from earnings?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="deductFromEarningsFinances">
            {{ onlinePlea?.pleaDetails?.deductFromEarnings | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Employer’s name</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="employerName">
            {{ onlinePlea?.employer?.name | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Employee reference</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="employeeReference">
            {{ onlinePlea?.employer?.employeeReference | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Employer’s address</td>
          <td pdk-table-cell pdk-typography="body-small" class="pre-line" data-locator="employerAddress">
            {{ onlinePlea?.employer?.address | formatAddress: '\\n' | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Employer telephone</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="employerPhone">
            {{ onlinePlea.employer?.phone | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Are they claiming benefits?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="benefitsClaimed">
            {{ onlinePlea?.employment?.benefitsClaimed | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Would they like us to deduct from benefits?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="benefitsDeductPenaltyPreference">
            {{ onlinePlea?.employment?.benefitsDeductPenaltyPreference | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Which benefits they are claiming?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="benefitsType">
            {{ onlinePlea?.employment?.benefitsType | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">National Insurance number</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="nationalInsuranceNumber">
            {{ onlinePlea?.personalDetails?.nationalInsuranceNumber | ifEmpty: '–' }}
          </td>
        </tr>
      </tbody>
      }
    </table>
    @if (!onlinePlea.aocpAccepted) {
    <h2 pdk-typography="heading-medium" aria-hidden="true" pdk-margin-bottom="0">
      Monthly outgoings
    </h2>
    }
    <table pdk-table>
      <caption class="pdk-visually-hidden">
        Monthly outgoings
      </caption>
      @if (!onlinePlea.aocpAccepted) {
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">
            Would they like to give details of their monthly bills?
          </td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="showDetailsOfMonthlyBillings">
            {{ onlinePlea?.outgoings?.showDetailsOfMonthlyBillings | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Accomodation</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="accommodationAmount">
            {{ onlinePlea?.outgoings?.accommodationAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Council Tax</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="councilTaxAmount">
            {{ onlinePlea?.outgoings?.councilTaxAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Household bills</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="householdBillsAmount">
            {{ onlinePlea?.outgoings?.householdBillsAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Travel expenses</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="travelExpensesAmount">
            {{ onlinePlea?.outgoings?.travelExpensesAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Child maintenance</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="childMaintenanceAmount">
            {{ onlinePlea?.outgoings?.childMaintenanceAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Are there any other expenses?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="areThereAnyOtherExpenses">
            {{ !!onlinePlea?.outgoings?.otherAmount | yesNo }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Other expenses listed</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="otherExpensesListed">
            {{ onlinePlea?.outgoings?.otherDescription | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Amount of other expenses?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="amountOfOtherExpenses">
            {{ onlinePlea?.outgoings?.otherAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Monthly amount total</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="monthlyAmountTotal">
            {{ onlinePlea?.outgoings?.monthlyAmount | sjpCurrency | ifEmpty: '–' }}
          </td>
        </tr>
      </tbody>
      }
    </table>
    } @if (!!onlinePlea?.onlinePleaLegalEntityDetails && shouldDisplayFinancialData()) {
    <h2 pdk-typography="heading-medium" aria-hidden="true" pdk-margin-bottom="0">Company finances</h2>
    <table pdk-table>
      <caption class="pdk-visually-hidden">
        Company finances
      </caption>
      <tbody pdk-table-body class="column-width">
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Has the company been trading for more than 12 months?</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="tradingMoreThan12Months">
            {{
              onlinePlea?.onlinePleaLegalEntityDetails?.legalEntityFinancialMeans?.tradingMoreThan12Months !== undefined
                ? (onlinePlea?.onlinePleaLegalEntityDetails?.legalEntityFinancialMeans?.tradingMoreThan12Months | yesNo)
                : '–'
            }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Number of employees</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="numberOfEmployees">
            {{ onlinePlea?.onlinePleaLegalEntityDetails?.legalEntityFinancialMeans?.numberOfEmployees | ifEmpty: '–' }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Gross turnover</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="grossTurnover">
            {{
              onlinePlea?.onlinePleaLegalEntityDetails?.legalEntityFinancialMeans?.grossTurnover
                | sjpCurrency
                | ifEmpty: '–'
            }}
          </td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell pdk-typography="body-small">Net profit margin</td>
          <td pdk-table-cell pdk-typography="body-small" data-locator="netTurnover">
            {{
              onlinePlea?.onlinePleaLegalEntityDetails?.legalEntityFinancialMeans?.netTurnover
                | sjpCurrency
                | ifEmpty: '–'
            }}
          </td>
        </tr>
      </tbody>
    </table>
    } }
  `,
  styles: [
    `
      .column-width td {
        width: 50%;
      }
    `
  ],
  imports: [
    BreadcrumbLinksComponent,
    CaseHeaderBadgeContainer,
    FormatDatePipe,
    DefendantNamePipe,
    FormatAddressPipe,
    IfEmptyPipe,
    PleaStatusPipe,
    SjpCurrencyPipe,
    YesNoPipe,
    CurrencyPipe,
    EmploymentStatusPipe,
    DateOfBirthComponent,
    PdkTable,
    PdkCore
  ]
})
export class OnlinePleaDetailsComponent {
  @Input() kase: Case;
  @Input() onlinePleas: OnlinePleaUi[];
  @Input() userGroups: UserGroup[] = [];
  breadcrumbs: Breadcrumb[] = [
    Breadcrumbs.HOME,
    Breadcrumbs.SEARCH,
    Breadcrumbs.CASE_OVERVIEW,
    Breadcrumbs.ONLINE_PLEA
  ];

  shouldDisplayFinancialData() {
    return !this.userGroups.some(group => group.groupName.includes('Prosecutor'));
  }

  isAocpPendingOrCompleted(plea: PleaType) {
    return plea === 'AOCP_PENDING' || this.kase.resultedThroughAocp;
  }
}
