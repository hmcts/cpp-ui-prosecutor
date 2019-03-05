import { Case, Offence } from '../case-overview.interfaces';

export const MOCK_OFFENCES: Offence[] = [
  {
    id: 'e1cfb89e-0dce-4e99-982f-bdf53b1023b6',
    offenceCode: 'CA03013',
    offenceSequenceNumber: 1,
    wording: 'On 02/07/2015 At threadneedle street EC2 Being a passenger on a Public service Vehicle operated on ..',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-19',
    chargeDate: '2019-01-24',
    compensation: 30,
    prosecutionFacts: 'An incident took place at GREEN PARK station whereby you were spoken to by a member of London ..'
  },
  {
    id: '4b47bdea-cf48-4f8d-815f-ba88a523dee1',
    offenceCode: 'CA03013',
    offenceSequenceNumber: 1,
    wording:
      'On 02/07/2015 At threadneedle street EC2 Being a passenger on a Public service Vehicle operated on behalf of ' +
      'London Bus Services Limited being used for the carriage of passengers at separate fares where the vehicle was ' +
      'being operated by a Driver without a Conductor did not as directed by the Driver an Inspector or a Notice ' +
      'displayed on the vehicle pay the fare for the journey in accordance with the direction ',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-15',
    chargeDate: '2019-01-27',
    compensation: 23,

    plea: 'NOT_GUILTY',
    pleaMethod: 'POSTAL',
    pleaDate: '2019-02-27T15:32:20.593Z',

    pendingWithdrawal: true,
    prosecutionFacts:
      'An incident took place at GREEN PARK station whereby you were spoken to by a member of London Underground staff ' +
      'regarding your train journey and the associated fare.The facts of this incidents are now being considered and I ' +
      'must advise you that legal proceedings may be initiated against you regarding this matter in accordance with the' +
      ' LU prosecution policy'
  }
];

export const MOCK_CASE: Case = {
  id: 'case-id-test',
  urn: 'TFL26168N21T5',
  defendant: {
    id: '946544e8-54c0-444b-8be9-5d79aedf7d93',
    offences: MOCK_OFFENCES,
    caseId: '734f9fba-445e-461d-9d94-c966a2d71c95',
    interpreter: {
      needed: false
    },
    speakWelsh: false,
    numPreviousConvictions: 2,
    personalDetails: {
      title: 'Mr',
      firstName: 'Guy',
      lastName: 'Smith',
      dateOfBirth: '1957-03-11',
      gender: 'Male',
      address: {
        address1: 'Flat 1, Armageddon House',
        address2: '13 Old Road',
        address3: 'Giggleswick',
        address4: 'Merton',
        postcode: 'CV8 1AB'
      },
      contactDetails: {},
      dobChanged: false,
      addressChanged: false,
      nameChanged: false
    }
  },
  dateTimeCreated: '2019-02-24T16:35:46.273Z',
  caseDocuments: [
    {
      id: '7664f354-1537-4767-b57a-5f1b69dd905e',
      materialId: '736fabcb-f42e-4677-9f0e-aa7620c5812c',
      documentType: 'PLEA',
      documentNumber: 1,
      addedAt: '2019-02-25T09:30:24.442Z'
    },
    {
      id: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'SJPN',
      documentNumber: 1,
      addedAt: '2019-02-24T16:35:56.558Z'
    }
  ],
  prosecutingAuthority: 'TFL',
  completed: true,
  assigned: false,
  costs: 19,
  postingDate: '2019-01-27',
  enterpriseId: 'Z8QG1JR7CMTD',
  onlinePleaReceived: false,
  status: 'COMPLETED',
  listedInCriminalCourts: false
};
