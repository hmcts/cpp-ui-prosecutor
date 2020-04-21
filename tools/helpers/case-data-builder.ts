import { Case } from '../../src/app/contexts/sjp';
import { getFixture } from '../../tools/utils';

const { prosecutorCaseData } = require('../fixtures/json/prosecutor-case-template.json');
const { pleadOnlinePayload } = require('../fixtures/json/plead-online.json');

export class CaseDataBuilder {
  constructor() {}

  static createCaseDataPayload(): any {
    const payload = JSON.parse(JSON.stringify(prosecutorCaseData));
    return payload;
  }

  static createSjpnDocData(urn: string) {
    return {
      material: getFixture('docs/sjp_session_URN_SJPN.PDF'),
      caseUrn: urn,
      prosecutingAuthority: 'GAEAA01',
      materialType: 'SJPN'
    };
  }

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
