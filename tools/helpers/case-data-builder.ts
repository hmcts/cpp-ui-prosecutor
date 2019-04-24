import {Case} from '../../src/app/contexts/sjp';

const { pleadOnlinePayload } = require('../fixtures/json/plead-online.json');

export class CaseDataBuilder {
  constructor() {}

  public static buildPleadOnlinePayload(kase: Case) {
    return {
      ...pleadOnlinePayload,
      personalDetails: {
        ...pleadOnlinePayload.personalDetails,
        lastName: kase.defendant.personalDetails.lastName
      },
      offences: [
        {
          ...pleadOnlinePayload.offences[0],
          id: kase.defendant.offences[0].id
        }
      ]
    };
  }

  public static buildPleadNotGuiltyPayload(interpreterLanguage = null, speakWelsh = false) {
    const payload = {
      interpreterRequired: !!interpreterLanguage,
      speakWelsh,
      plea: 'NOT_GUILTY'
    };

    if (interpreterLanguage) {
      return {
        ...payload,
        interpreterLanguage
      };
    }

    return payload;
  }

  public static buildDefendantDetailsUpdatesPayload(loadedCase, dateOfBirth) {
    return {
      ...loadedCase.defendant.personalDetails,
      dateOfBirth,
      contactNumber: {}
    };
  }
}
