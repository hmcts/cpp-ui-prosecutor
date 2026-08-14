import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDecision } from '../../../contexts/sjp';
import { formatCurrency, formatString } from '../../../contexts/sjp/util/sjp-util';
import { PdkCore, PdkGrid } from '@cpp/pdk';
import { PaymentTypePipe } from '../../../shared/pipes/payment-type/payment-type.pipe';
import { formatDate } from '../../../../../utils/date';

@Component({
  selector: 'payment-and-collection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div pdk-margin-left="2">
      <div pdk-margin-bottom="3">
        <b pdk-typography="heading-medium">Payment and collection</b>
      </div>
      <div>
        <pdk-grid container pdk-padding-vertical="1">
          <pdk-grid one-third>
            @if (isCollectionOrderMade) {
            <b>Collection order made</b>
            } @else {
            <b>No collection order made</b>
            }
          </pdk-grid>
          <pdk-grid two-thirds> {{ caseDecision.financialImposition.payment.paymentType | paymentType }}. </pdk-grid>
        </pdk-grid>

        <pdk-grid container pdk-padding-vertical="1">
          <pdk-grid one-third>
            @if (payment.paymentType === 'PAY_TO_COURT') {
            <div>
              <b>Reason no deduction or attachment made</b>
            </div>
            } @if (payment.paymentType === 'DEDUCT_FROM_BENEFITS') {
            <div>
              <b>Application made for benefit deductions </b>
            </div>
            } @if (payment.paymentType === 'ATTACH_TO_EARNINGS') {
            <div>
              <b>Attachment of Earnings Order made for the collection of </b>
            </div>
            }
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ paymentExplanation }}
          </pdk-grid>
        </pdk-grid>

        <pdk-grid container pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>{{ payment.paymentType === 'PAY_TO_COURT' ? 'Payment terms' : 'Reserve terms(if deductions fail)' }}</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ this.buildPaymentTerms() }}
          </pdk-grid>
        </pdk-grid>

        <pdk-grid container pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>Total to pay</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ totalSum }}
          </pdk-grid>
        </pdk-grid>
      </div>
    </div>
  `,
  imports: [PdkCore, PdkGrid, PaymentTypePipe]
})
export class PaymentAndCollectionComponent {
  @Input() caseDecision: CaseDecision;
  formatCurrency = formatCurrency;

  buildPaymentTerms(): string {
    const payment = this.caseDecision.financialImposition.payment;
    const lumpSum = payment.paymentTerms.lumpSum;
    const instalments = payment.paymentTerms.installments;

    if (lumpSum && lumpSum.withinDays > 0) {
      if (payment.paymentType === 'PAY_TO_COURT') {
        return formatString(
          '{0} To be paid as a lump sum within {1} days',
          formatCurrency(lumpSum.amount),
          lumpSum.withinDays
        );
      } else {
        return formatString('Outstanding balance to be paid as a Lump sum within {0} days', lumpSum.withinDays);
      }
    } else {
      if (lumpSum && lumpSum.amount > 0) {
        return formatString(
          'A lump sum of {0} to be paid, followed by instalments of {1} paid {2} starting on {3}',
          formatCurrency(lumpSum.amount),
          formatCurrency(instalments.amount),
          instalments.period.toLowerCase(),
          formatDate(instalments.startDate)
        );
      } else {
        return formatString(
          'Instalments of {0} to be paid {1} starting {2}',
          formatCurrency(instalments.amount),
          instalments.period.toLowerCase(),
          instalments.startDate
        );
      }
    }
  }

  get payment() {
    return this.caseDecision.financialImposition.payment;
  }

  get totalSum() {
    return this.formatCurrency(this.caseDecision.financialImposition.payment.totalSum);
  }

  get isCollectionOrderMade(): boolean {
    return this.caseDecision.financialImposition.costsAndSurcharge.collectionOrderMade;
  }

  getReasonForDeductingFromBenefits(value: string) {
    const deductReasons = new Map();
    deductReasons.set('COMPENSATION_ORDERED', 'Compensation ordered');
    deductReasons.set('DEFENDANT_KNOWN_DEFAULTER', 'Defendant is a known defaulter');
    deductReasons.set('DEFENDANT_REQUESTED', 'Defendant requested');
    return deductReasons.get(value);
  }

  get paymentExplanation() {
    if (this.payment.paymentType === 'DEDUCT_FROM_BENEFITS') {
      return formatString(
        'Sum to be recovered {0}. Reason: {1}',
        this.totalSum,
        this.getReasonForDeductingFromBenefits(this.payment.reasonForDeductingFromBenefits)
      );
    }

    if (this.payment.paymentType === 'ATTACH_TO_EARNINGS') {
      return formatString(
        '{0}. Reason: {1}',
        this.totalSum,
        this.getReasonForDeductingFromBenefits(this.payment.reasonForDeductingFromBenefits)
      );
    }
    return this.payment.reasonWhyNotAttachedOrDeducted;
  }
}
