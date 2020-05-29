import { Pipe, PipeTransform } from '@angular/core';

export const errorMessageMap = {
  ORPHAN_CASE: 'No matching offence in offences CSV',
  ORPHAN_OFFENCE: 'No matching offence in header CSV',
  PROSECUTOR_CASE_ID_MISSING: 'You must enter prosecutor case ID',
  PROSECUTOR_CASE_ID_DUPLICATED: 'Case duplicated in this CSV - remove one instance',
  OFFENCE_SEQUENCE_NO_NOT_EQUAL_TO_ONE: 'Incorrect number of offences for a case',
  NOT_SJP_CASE: 'Not an SJP case - fix or remove',
  SUMMONS_CODE_NOT_FOR_SJP: 'You must enter M in summons code',
  LIBRA_HEARING_LOCATION_UNKNOWN: 'You must enter valid libra hearing location',
  DATE_OF_HEARING_WRONG_FORMAT: 'You must enter date of hearing in YYYY-MM-DD format',
  CHARGE_DATE_WRONG_FORMAT: 'You must enter charge date in YYYY-MM-DD format',
  OFFENCE_DATE_WRONG_FORMAT: 'You must enter offence date in YYYY-MM-DD format',
  OFFENCE_OUTSIDE_TIME_LIMIT_FOR_PROSECUTION: 'You must enter offence date which is inside offence time limit',
  NUMBER_OF_PREVIOUS_CONVICTIONS_BAD_VALUE: 'You must enter number of previous convictions in number format',
  COSTS_NOT_MONETARY_VALUE: 'You must enter costs in monetary format, eg 20.99',
  COMPENSATION_NOT_MONETARY_VALUE: 'You must enter compensation in monetary format, eg 20.99',
  POSTING_DATE_WRONG_FORMAT: 'You must enter offence date in YYYY-MM-DD format',
  POSTING_DATE_MORE_THAN_SIX_MONTHS_FROM_CURRENT_DATE:
    'You must enter posting date which is less than six months from current date',
  OFFENCE_WORDING_MISSING: 'You must enter the offence wording',
  DEFENDANT_FAMILY_NAME_MISSING: 'You must enter defendant’s last name',
  DEFENDANT_BOTH_ADDRESS_LINE1_AND_ADDRESS_LINE2_ARE_MISSING:
    'You must enter at least address line 1 or address line 2',
  DEFENDANT_POST_TOWN_MISSING: 'You must enter post town',
  DEFENDANT_DATE_OF_BIRTH_WRONG_FORMAT: 'You must enter date of birth in YYYY-MM-DD format',
  DEFENDANT_DATE_OF_BIRTH_OUT_OF_RANGE: 'You must enter a date before today’s dat',
  DEFENDANT_GENDER_UNKNOWN: 'You must enter valid gender',
  CJS_OFFENCE_CODE_IS_NOT_VALID: 'You must enter summary or non-imprisonable CJS offence code',
  OFFENCE_DATE_IS_AFTER_CHARGE_DATE: 'You must enter charge date which is after offence date',
  OFFENCE_OUTSIDE_TIME_LIMIT_FOR_PROSECUTIONS: 'You must enter offence date within time limit for prosecutions',
  OFFENCE_TAKES_NO_EFFECT: 'You must enter offence date which is valid for offence',
  DUPLICATED_CASE_FOUND: 'Case already exists',
  DEFENDANT_DATE_OF_BIRTH_MISSING: 'You must enter date of birth in YYYY-MM-DD format',
  POSTCODE_MISSING: 'You must enter defendant’s postcode',
  POSTCODE_INVALID_FORMAT: 'You must enter a valid defendant postcode including the space, for example WC2A 2LL',
};

@Pipe({ name: 'uploadError' })
export class UploadErrorPipe implements PipeTransform {
  transform(errorKey: string): string {
    if (!errorMessageMap[errorKey]) {
      throw new Error('Invalid key');
    }

    return errorMessageMap[errorKey];
  }
}
