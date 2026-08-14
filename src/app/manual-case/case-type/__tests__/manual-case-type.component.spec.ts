import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManualCaseTypeComponent } from '../manual-case-type.component';
import { ManualCase } from '../../../core/model/manual-case';
import { AppConfigService } from '../../../config';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

const manualCaseDetail = {
  caseId: 'ba73207f-3ced-488a-82a0-3fba79c2ce85',
  initiationCode: 'S',
  summonsCode: 'E'
} as ManualCase;

const summonsCodes = [
  {
    id: '4aaecac5-222b-402d-9047-84803679edac',
    seqNo: 10,
    summonsCode: 'A',
    summonsCodeDescription: 'Application / Complaint',
    validFrom: '2019-03-01'
  },
  {
    id: '5aaecac5-222b-402d-9047-84803679edac',
    seqNo: 20,
    summonsCode: 'B',
    summonsCodeDescription: 'Breach offences',
    validFrom: '2019-03-01'
  }
];

describe('Manual Case Type Component', () => {
  let component: ManualCaseTypeComponent;
  let fixture: ComponentFixture<ManualCaseTypeComponent>;
  let location: Location;

  beforeEach(() => {
    const mockLocation = {
      back: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, ManualCaseTypeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Location,
          useValue: mockLocation
        },
        {
          provide: AppConfigService,
          useValue: {
            getBaseUrl: () => 'mock-base-url'
          }
        },
        provideRouter([]),
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(ManualCaseTypeComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  function setupComponent(defendant: ManualCase, codes: any[], hasNpp = true) {
    component.manualCaseDetail = defendant;
    component.summonsCodes = codes;
    component.hasNpp = hasNpp;
    fixture.detectChanges();
  }

  it('should render the component correctly in edit mode', () => {
    setupComponent(manualCaseDetail, summonsCodes);
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component for npp', () => {
    setupComponent(manualCaseDetail, summonsCodes, false);
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the component correctly in addnew mode', () => {
    setupComponent({} as ManualCase, summonsCodes);
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit individual type applicant data', () => {
    const mockData = {
      initiationCode: 'S',
      summonsCode: 'E'
    } as ManualCase;

    setupComponent({} as ManualCase, summonsCodes);

    component.submitData(mockData);
    expect(component.editManualCase.initiationCode).toEqual(mockData.initiationCode);
    expect(component.editManualCase.summonsCode).toEqual(mockData.summonsCode);
  });

  it('should call location back', () => {
    setupComponent({} as ManualCase, []);
    component.back();

    expect(location.back).toHaveBeenCalledTimes(1);
  });
});
