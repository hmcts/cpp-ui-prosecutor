import { TestBed } from '@angular/core/testing';
import { OffenceParsingService, MessageProcessor } from '../../case-offence-parsing/offence-parsing.service';

// Todo: test /n and other special characters in the messages

const top_4FormObject = {
  sections: [
    {
      list: [
        {
          children: [
            {
              label: 'Specify the bail condition',
              type: 'TEXT'
            }
          ],
          label: 'A bail condition, namely',
          type: 'RADIO',
          value: 0
        },
        {
          children: [
            {
              label: 'Specify the bail conditions',
              type: 'TEXT'
            }
          ],
          label: 'Bail conditions, namely',
          type: 'RADIO',
          value: 1
        }
      ],
      type: 'LIST'
    },
    {
      label: 'being a person released on ',
      type: 'LABEL'
    },
    {
      label: 'Specify date bailed',
      type: 'TEXT'
    },
    {
      label: ' by',
      type: 'LABEL'
    },
    {
      list: [
        {
          children: [
            {
              label: 'Specify court',
              type: 'TEXT'
            }
          ],
          label: '',
          type: 'RADIO',
          value: 0
        },
        {
          children: [
            {
              label: 'Specify police station',
              type: 'TEXT'
            }
          ],
          label: 'The custody officer at ',
          type: 'RADIO',
          value: 1
        }
      ],
      type: 'LIST'
    },
    {
      label: 'being under a duty to surrender into the custody of a court',
      type: 'LABEL'
    }
  ],
  title: ''
};

const top_1FormObject = {
  sections: [
    {
      label: 'Offence date type',
      type: 'DROPDOWN'
    },
    {
      label: 'Specify date',
      type: 'DATE'
    },
    {
      label: ' at ',
      type: 'LABEL'
    },
    {
      label: 'Specify township',
      type: 'TEXT'
    },
    {
      label: ' used or threatened unlawful violence towards',
      type: 'LABEL'
    },
    {
      list: [
        {
          label: 'Another',
          type: 'RADIO',
          value: 0
        },
        {
          label: 'Other persons',
          type: 'RADIO',
          value: 1
        }
      ],
      type: 'LIST'
    },
    {
      label:
        'and your conduct was such as would cause a person of reasonable firmness present at the scene to fear for his personal safety',
      type: 'LABEL'
    }
  ],
  title: ''
};

const formObject_1 = {
  sections: [
    {
      label: 'Offence date type',
      type: 'DROPDOWN'
    },
    {
      label: 'Specify date',
      type: 'DATE'
    },
    {
      label: ' at ',
      type: 'LABEL'
    },
    {
      label: 'Specify township',
      type: 'TEXT'
    },
    {
      label: ' without the authority of the proper officer, was concerned in the ',
      type: 'LABEL'
    },
    {
      list: [
        {
          label: 'Cancellation',
          type: 'RADIO',
          value: 0
        },
        {
          label: 'Alteration',
          type: 'RADIO',
          value: 1
        },
        {
          label: 'Obliteration',
          type: 'RADIO',
          value: 2
        }
      ],
      type: 'LIST'
    },
    {
      label: 'of a mark, letter or device on a ',
      type: 'LABEL'
    },
    {
      list: [
        {
          children: [
            {
              label: 'Specify the goods',
              type: 'TEXT'
            }
          ],
          label: 'Container in which goods, namely',
          type: 'RADIO',
          value: 0
        },
        {
          children: [
            {
              label: 'Specify the goods',
              type: 'TEXT'
            }
          ],
          label: 'Lot of goods, namely , which',
          type: 'RADIO',
          value: 1
        }
      ],
      type: 'LIST'
    },
    {
      list: [
        {
          label: 'Loaded as mentioned in section 67(1) of the Customs and Excise Management Act 1979',
          type: 'RADIO',
          value: 0
        },
        {
          label: 'Retained as mentioned in section 67(1) of the Customs and Excise Management Act 1979',
          type: 'RADIO',
          value: 1
        },
        {
          children: [
            {
              label: 'Specify the location',
              type: 'TEXT'
            }
          ],
          label: 'Brought to a customs and excise station at  for exportation by land',
          type: 'RADIO',
          value: 2
        }
      ],
      type: 'LIST'
    },
    {
      label: 'being',
      type: 'LABEL'
    },
    {
      list: [
        {
          label: 'Goods from warehouse',
          type: 'RADIO',
          value: 0
        },
        {
          label: 'Transit goods',
          type: 'RADIO',
          value: 1
        },
        {
          label: 'Goods chargeable with a duty which had not been paid',
          type: 'RADIO',
          value: 2
        },
        {
          label: 'Drawback goods',
          type: 'RADIO',
          value: 3
        }
      ],
      type: 'LIST'
    }
  ],
  title: ''
};

const welschEdgeCaseFormObject = {
  sections: [
    {
      label: 'Ar ',
      type: 'LABEL'
    },
    {
      label: 'Specify date',
      type: 'DATE'
    },
    {
      label: ' yn ',
      type: 'LABEL'
    },
    {
      label: 'Specify township',
      type: 'TEXT'
    },
    {
      label: ' bu i chi gynllwynio ynghyd √¢/ag',
      type: 'LABEL'
    },
    {
      list: [
        {
          children: [
            {
              label: 'Specify the person',
              type: 'TEXT'
            }
          ],
          label: '',
          type: 'RADIO',
          value: 0
        },
        {
          children: [
            {
              label: 'Specify the persons',
              type: 'TEXT'
            }
          ],
          label: '',
          type: 'RADIO',
          value: 1
        },
        {
          label: 'Unigolyn arall',
          type: 'RADIO',
          value: 2
        },
        {
          label: 'Unigolion eraill',
          type: 'RADIO',
          value: 3
        }
      ],
      type: 'LIST'
    },
    {
      label: 'i ymosod ar ',
      type: 'LABEL'
    },
    {
      label: 'Specify the person assaulted',
      type: 'TEXT'
    },
    {
      label: ' a thrwy hynny beri gwir niwed corfforol',
      type: 'LABEL'
    },
    {
      list: [
        {
          label: 'Iddo ef',
          type: 'RADIO',
          value: 0
        },
        {
          label: 'Iddi hi',
          type: 'RADIO',
          value: 1
        }
      ],
      type: 'LIST'
    }
  ],
  title: ''
};

describe('Pre-parsing - preparse()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OffenceParsingService]
    });
  });

  it('should replace ]_]_ characters with ]_', async () => {
    const mp = new MessageProcessor();
    const message = 'IFY DATE knowing that (..SPECIFY NAME.]_]_, being a child';
    const correct = 'IFY DATE knowing that (..SPECIFY NAME.]_, being a child';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace ] characters with ]_', async () => {
    const mp = new MessageProcessor();
    const message = 'IFY DATE knowing that (..SPECIFY NAME], being ]_ a child';
    const correct = 'IFY DATE knowing that (..SPECIFY NAME]_, being ]_ a child';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace ..,) characters with ..)', async () => {
    const mp = new MessageProcessor();
    const message = 'IFY DATE knowing that (..SPECIFY NAME..,), being a child';
    const correct = 'IFY DATE knowing that (..SPECIFY NAME..), being a child';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace ,,) characters with ..)', async () => {
    const mp = new MessageProcessor();
    const message = 'IFY DATE knowing that (..SPECIFY NAME,,), being a child';
    const correct = 'IFY DATE knowing that (..SPECIFY NAME..), being a child';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace )_ characters with ]_ ', async () => {
    const mp = new MessageProcessor();
    const message = 'IFY DATE knowing that _[RADIO NAME)_, being a child';
    const correct = 'IFY DATE knowing that _[RADIO NAME]_, being a child';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace _{ characters with [_ ', async () => {
    const mp = new MessageProcessor();
    const message = ' (B)_{chyfer hi]_';
    const correct = ' (B)_[chyfer hi]_';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  // This correction is to general, and it might cause more issues - currently off
  xit('should replace )_ characters with _[', async () => {
    const mp = new MessageProcessor();
    const message = ' (B)_her]_';
    const correct = ' (B)_[her]_';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  // This correction is to general ((B)_ her]_)
  xit('should replace )_ characters with _[', async () => {
    const mp = new MessageProcessor();
    const message = ' (B)_ her]_';
    const correct = ' (B)_[her]_';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  // Looking for best solution for that
  xit('should not replace )_ as it is a part of closing tag', async () => {
    const mp = new MessageProcessor();
    const message = '**(..SPECIFY THE SHIP..)_';
    const correct = '**(..SPECIFY THE SHIP..)_';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace )_ characters with ]_ and _( with _[', async () => {
    const mp = new MessageProcessor();
    const message = 'niwed corfforol<br /><br />(E)_(iddo ef)_<br />(F)_(iddi hi)_';
    const correct = 'niwed corfforol<br /><br />(E)_[iddo ef]_<br />(F)_[iddi hi]_';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });

  it('should replace ..} characters ..)', async () => {
    const mp = new MessageProcessor();
    const message = 'IFY DATE knowing that (..SPECIFY NAME..}, being a child';
    const correct = 'IFY DATE knowing that (..SPECIFY NAME..), being a child';
    mp.preparse(message);
    expect(mp.message).toEqual(correct);
  });
});

describe('Parsing service, message with errors to correct and nested entry elements', () => {
  const parsingService = new OffenceParsingService();
  const testMessage_1 =
    // tslint:disable-next-line:max-line-length
    'On **(..SPECIFY DATE..} at **(..SPECIFY TOWNSHIP..,), without the authority of the proper officer, was concerned in the <br /><br />(A)_[cancellation]_<br />(B)_[alteration]_<br />(C)_[obliteration]_]_ <br /><br />of a mark, letter or device on a <br /><br />(D)_[container in which goods, namely **(..SPECIFY THE GOODS..),]_<br />(E)_[lot of goods, namely **(..SPECIFY THE GOODS,,), which]_ <br /><br />were<br />(F)_[loaded as mentioned in section 67(1) of the Customs and Excise Management Act 1979]<br />(G)_[retained as mentioned in section 67(1) of the Customs and Excise Management Act 1979]_<br />(H)_[brought to a customs and excise station at **(..SPECIFY THE LOCATION..) for exportation by land]_<br /><br />being<br /><br />(I)_[goods from warehouse]_<br />(J)_[transit goods]_<br />(K)_[goods chargeable with a duty which had not been paid)_<br />(L)_[drawback goods]_';
  const top_1Offence =
    // tslint:disable-next-line:max-line-length
    'On **(..SPECIFY DATE..) at **(..SPECIFY TOWNSHIP..) used or threatened unlawful violence towards<br /><br />(A)_[another]_<br />(B)_[other persons]_<br /><br />and your conduct was such as would cause a person of reasonable firmness present at the scene to fear for his personal safety';
  const top_4Offence =
    // tslint:disable-next-line:max-line-length
    'On **(..SPECIFY DATE..) at **(..SPECIFY TOWNSHIP..) having been arrested by a constable <br /><br />(A)_[for breaking]_<br />(B)_[being likely to break]_<br /><br />(C)_[a bail condition, namely **(..SPECIFY THE BAIL CONDITION..),]_<br />(D)_[bail conditions, namely **(..SPECIFY THE BAIL CONDITIONS..),]_ <br /><br />being a person released on **(..SPECIFY DATE BAILED..) by<br /><br />(E)_[**(..SPECIFY COURT..)]_<br />(F)_[the custody officer at **(..SPECIFY POLICE STATION..)]_<br /><br />being under a duty to surrender into the custody of a court';
  const welshEdgeCase =
    // tslint:disable-next-line:max-line-length
    'Ar **(..SPECIFY DATE..) yn **(..SPECIFY TOWNSHIP..) bu i chi gynllwynio ynghyd √¢/ag<br /><br />(A)_[**(..SPECIFY THE PERSON..)]_<br />(B)_[**(..SPECIFY THE PERSONS..)]_<br />(C)_[unigolyn arall]_<br />(D)_[unigolion eraill]_<br /><br />i ymosod ar **(..SPECIFY THE PERSON ASSAULTED..), a thrwy hynny beri gwir niwed corfforol<br /><br />(E)_(iddo ef)_<br />(F)_(iddi hi)_';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OffenceParsingService]
    });
  });

  it('Should parse the message to the form object', async () => {
    const formObject = parsingService.parse(testMessage_1);
    expect(formObject).toEqual(formObject_1);
  });

  it('Top 1 offence - PU86003 - Should parse the message to the form object', async () => {
    const formObject = parsingService.parse(top_1Offence);
    expect(formObject).toEqual(top_1FormObject);
  });

  it('Edge case - BA12068 - Should parse the message to the form object', async () => {
    const formObject = parsingService.parse(welshEdgeCase);
    expect(formObject).toEqual(welschEdgeCaseFormObject);
  });

  xit('Top 5 offence - PL96001 - Should parse the message to the form object', async () => {
    const formObject = parsingService.parse(top_4Offence);
    expect(formObject).toEqual(top_4FormObject);
  });
});
