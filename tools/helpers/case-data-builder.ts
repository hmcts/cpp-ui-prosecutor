import { Case } from '../../src/app/contexts/sjp';

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

  public static buildPleadNotGuiltyPayload(offenceId: string, defendantId: string) {
    const payload = {
      defendantCourtOptions: {
        welshHearing: false,
        interpreter: {
          needed: false
        }
      },
      pleas: [
        {
          offenceId: `${offenceId}`,
          defendantId: `${defendantId}`,
          pleaType: 'NOT_GUILTY'
        }
      ]
    };
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
