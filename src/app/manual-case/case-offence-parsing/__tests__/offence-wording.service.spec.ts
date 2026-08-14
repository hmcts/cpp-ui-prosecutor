import { OffenceWordingService } from '../offence-wording.service';
import { ElementType, Element } from '../../../core/model/manual-case';
import { ManualCaseOffence } from '../../../core/model/manual-case-offence';

const offenceTypes = [
  { value: 3, label: 'after' },
  { value: 4, label: 'between' }
];

describe('Preparsing - preparse()', () => {
  const wordingService = new OffenceWordingService();

  it('should build wording for the offence dates and location', () => {
    const particularFormSections = [
      {
        type: ElementType.Dropdown,
        label: 'Offence date type',
        value: 4
      },
      {
        type: ElementType.Date,
        label: 'Specify Date',
        value: '2018-10-15',
        valueTwo: '2018-12-20'
      },
      {
        type: ElementType.Label,
        label: 'occurring at'
      },
      {
        type: ElementType.Text,
        label: 'Specify township',
        value: 'Liverpool street'
      }
    ] as Element[];

    const editOffence = {
      offenceCommittedDate: undefined,
      offenceCommittedEndDate: undefined
    } as ManualCaseOffence;

    const wording = wordingService.buildParticularWording(particularFormSections, offenceTypes, editOffence);

    expect(wording).toEqual('Between 15 October 2018 to 20 December 2018 occurring at Liverpool street');
    expect(editOffence).toEqual({
      offenceDateCode: 4,
      offenceCommittedDate: '2018-10-15',
      offenceCommittedEndDate: '2018-12-20'
    });
  });

  it('should build wording for the offence list options', async () => {
    const particularFormSections = [
      {
        type: ElementType.List,
        value: 1,
        list: [
          {
            type: ElementType.Radio,
            label: 'Allowed another, namely',
            value: 1,
            children: [
              {
                type: ElementType.Text,
                label: 'Specify person',
                value: 'Mr. Dora DIMSUM'
              },
              {
                type: ElementType.Label,
                label: 'to have possession of an official document, namely'
              },
              {
                type: ElementType.Text,
                label: 'Specify document',
                value: 'The secret code'
              },
              {
                type: ElementType.Label,
                label: 'issued for your use alone'
              }
            ]
          },
          {
            type: ElementType.Radio,
            label: 'Communicated to',
            value: 2,
            children: [
              {
                type: ElementType.Text,
                label: 'Specify to whom word was communicated'
              },
              {
                type: ElementType.Label,
                label: 'a secret official code word issued for use alone'
              }
            ]
          }
        ]
      }
    ] as Element[];

    const editOffence = {} as ManualCaseOffence;

    const wording = wordingService.buildParticularWording(particularFormSections, offenceTypes, editOffence);

    expect(wording).toEqual(
      ' allowed another, namely Mr. Dora DIMSUM to have possession of an official document, ' +
        'namely The secret code issued for your use alone'
    );
    expect(editOffence).toEqual({});
  });
});
