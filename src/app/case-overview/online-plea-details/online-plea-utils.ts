import { OnlinePlea, FrequencyOptions } from '../../contexts/sjp';
import { OnlinePleaUi } from './online-plea-interface';

export const transformOnlinePleaToUiModel = (onlinePleas: OnlinePlea[]): OnlinePleaUi[] => {
  const onlinePleasUi: OnlinePleaUi[] = [];

  onlinePleas.forEach(onlinePlea => {
    const onlinePleaUi = onlinePlea as OnlinePleaUi;

    if (onlinePlea.pleaDetails) {
      onlinePleaUi.onlinePleaDetails.forEach(offencePlea => {
        offencePlea.pleasGuilty = offencePlea.plea === 'GUILTY' || offencePlea.plea === 'GUILTY_REQUEST_HEARING';
      });
      onlinePleaUi.pleaDetails.doHaveOwnWitness = !!onlinePlea.pleaDetails.witnessDetails;
      onlinePleaUi.pleaDetails.existsUnavailability = !!onlinePlea.pleaDetails.unavailability;
    }
    if (onlinePlea.employer && onlinePlea.pleaDetails) {
      onlinePleaUi.pleaDetails.deductFromEarnings = !!onlinePlea.employer.name;
    }
    if (onlinePlea.employment) {
      onlinePleaUi.employment.status = onlinePlea.employment.employmentStatus;
      onlinePleaUi.employment.details = onlinePlea.employment.employmentStatusDetails;
      const { benefitsType, incomePaymentAmount, incomePaymentFrequency } = onlinePlea.employment;
      onlinePleaUi.employment.wantGiveIncomeBenefitDetails =
        !!benefitsType || (!!incomePaymentAmount && !!incomePaymentFrequency);
      const frequency = FrequencyOptions.find(freq => freq.value === onlinePlea.employment.incomePaymentFrequency);
      onlinePleaUi.employment.incomeAfterTaxType = frequency ? frequency.label : undefined;
    }
    if (onlinePlea.outgoings) {
      onlinePleaUi.outgoings.showDetailsOfMonthlyBillings = !!onlinePlea.outgoings.monthlyAmount;
    }

    if (onlinePlea.personalDetails) {
      onlinePleaUi.personalDetails.hasDriverLicense =
        !!onlinePlea.personalDetails.driverNumber || !!onlinePlea.personalDetails.driverLicenceDetails;
      onlinePleaUi.personalDetails.hasUkDriverLicense = !!onlinePlea.personalDetails.driverNumber;
    }

    // Only show court hearing if there's at least one not guilty or guilty request hearing
    if (onlinePleaUi.pleaDetails) {
      onlinePleaUi.pleaDetails.hasHearing = onlinePlea.onlinePleaDetails.some(
        plea => plea.plea === 'NOT_GUILTY' || plea.plea === 'GUILTY_REQUEST_HEARING'
      );
    }

    if (onlinePlea.onlinePleaDetails.some(plea => plea.plea === 'NOT_GUILTY') && onlinePleaUi.pleaDetails) {
      onlinePleaUi.pleaDetails.comeToCourt = undefined;
    }
    onlinePleasUi.push(onlinePleaUi);
  });

  return onlinePleasUi;
};
