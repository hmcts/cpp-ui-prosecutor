import { Location } from '@angular/common';
import { Shallow } from 'shallow-render';
import { FormsModule } from '@angular/forms';
import {
  PdkCoreModule,
  PdkFormModule,
  PdkDateInputModule,
  PdkGridModule,
  PdkRadioInputModule,
  PdkInsetTextModule,
} from '@cpp/pdk';
import { ManualCaseTypeComponent } from '../manual-case-type.component';
import { ManualCaseModule } from '../../manual-case.module';
import { ManualCase } from '../../../core/model/manual-case';
// import { InlineSVGComponent } from 'ng-inline-svg/lib_commonjs/inline-svg.component';
import { AppConfigService } from '../../../config';

const manualCaseDetail = {
  caseId: 'ba73207f-3ced-488a-82a0-3fba79c2ce85',
  initiationCode: 'S',
  summonsCode: 'E',
} as ManualCase;

const summonsCodes = [
  {
    id: '4aaecac5-222b-402d-9047-84803679edac',
    seqNo: 10,
    summonsCode: 'A',
    summonsCodeDescription: 'Application / Complaint',
    validFrom: '2019-03-01',
  },
  {
    id: '5aaecac5-222b-402d-9047-84803679edac',
    seqNo: 20,
    summonsCode: 'B',
    summonsCodeDescription: 'Breach offences',
    validFrom: '2019-03-01',
  },
];

describe('Manual Case Type Component', () => {
  let component: Shallow<ManualCaseTypeComponent>;

  beforeEach(() => {
    component = new Shallow(ManualCaseTypeComponent, ManualCaseModule)
      .provide([Location])
      .mock(Location, { back: () => undefined })
      .provide(AppConfigService)
      .mock(AppConfigService, { getBaseUrl: () => 'mock-base-url' })
      .dontMock(
        FormsModule,
        PdkCoreModule,
        PdkFormModule,
        PdkDateInputModule,
        // InlineSVGComponent,
        PdkGridModule,
        PdkRadioInputModule,
        PdkInsetTextModule
      );
  });

  function renderComponent(defendant, codes, hasNpp = true) {
    return component.render(
      `<manual-case-type
            [manualCaseDetail]="manualCaseDetail"
            [hasNpp]="hasNpp"
            [summonsCodes]="summonsCodes"
            (submitFormData)="handleSubmitForm($event)">
       </manual-case-type>`,
      {
        bind: {
          hasNpp,
          manualCaseDetail: defendant,
          summonsCodes: codes,
          handleSubmitForm: () => jest.fn(),
        },
      }
    );
  }

  it('should render the component correctly in edit mode', async () => {
    const { fixture, instance } = await renderComponent(manualCaseDetail, summonsCodes);

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component for npp', async () => {
    const { fixture, instance } = await renderComponent(manualCaseDetail, summonsCodes, false);

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component correctly in addnew mode', async () => {
    const { fixture, instance } = await renderComponent({}, summonsCodes);

    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit individual type applicant data', async () => {
    const mockData = {
      initiationCode: 'S',
      summonsCode: 'E',
    } as ManualCase;

    const { instance } = await renderComponent({}, summonsCodes);

    instance.submitData(mockData);
    expect(instance.editManualCase.initiationCode).toEqual(mockData.initiationCode);
    expect(instance.editManualCase.summonsCode).toEqual(mockData.summonsCode);
  });

  it('should call location back', async () => {
    const { instance, get } = await renderComponent({}, {});
    instance.back();

    const location = get(Location);
    expect(location.back).toHaveBeenCalledTimes(1);
  });
});
