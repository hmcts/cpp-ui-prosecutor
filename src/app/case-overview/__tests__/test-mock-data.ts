import { Case, CaseDocumentMetaData, ContactDetails, Offence } from '../../contexts/sjp';

export const MOCK_OFFENCES: Offence[] = [
  {
    id: 'offenceId1',
    offenceCode: 'CA03013',
    title: 'offence title 1',
    legislation: 'legislation 2',
    offenceSequenceNumber: 1,
    wording: 'On 02/07/2015 At threadneedle street EC2 Being a passenger on a Public service Vehicle operated on ..',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-19',
    chargeDate: '2019-01-24',
    compensation: 30,
    withdrawalRequestReason: 'some reason',
    prosecutionFacts: 'An incident took place at GREEN PARK station whereby you were spoken to by a member of London ..'
  } as Offence,
  {
    id: 'offenceId2',
    offenceCode: 'CA03013',
    title: 'offence title 2',
    legislation: 'legislation 1',
    offenceSequenceNumber: 1,
    wording:
      'On 02/07/2015 At thread needle street EC2 Being a passenger on a Public service Vehicle operated on behalf of ' +
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
  } as Offence
];

export const MOCK_CASE: Case = {
  id: 'case-id-test',
  datesToAvoid: 'datesToAvoid1',
  urn: 'TFL26168N21T5',
  defendant: {
    id: 'defendantId1',
    offences: MOCK_OFFENCES,
    caseId: 'case-id-test',
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
      contactDetails: {
        mobile: '77777777',
        email: 'a@a.com',
        home: '333333333'
      } as ContactDetails,
      dobChanged: false,
      addressChanged: false,
      nameChanged: false
    }
  },
  dateTimeCreated: '2019-02-24T16:35:46.273Z',
  caseDocuments: [
    {
      id: 'documentId1',
      materialId: '736fabcb-f42e-4677-9f0e-aa7620c5812c',
      documentType: 'PLEA',
      documentNumber: 1,
      addedAt: '2019-02-25T09:30:24.442Z',
      metadata: {} as CaseDocumentMetaData
    },
    {
      id: 'documentId2',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'SJPN',
      documentNumber: 1,
      addedAt: '2019-02-24T16:35:56.558Z',
      metadata: {} as CaseDocumentMetaData
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
