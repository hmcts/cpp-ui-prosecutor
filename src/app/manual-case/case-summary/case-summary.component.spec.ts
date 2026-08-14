import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ManualCaseSummaryComponent } from './case-summary.component';
import { ManualCase } from '../../core/model/manual-case';
import { ManualCaseOffenceStateService } from '../offences-state.service';
import { ManualCaseDefendant } from '../../core';
import { provideTranslateService } from '@ngx-translate/core';

describe('ManualCaseSummaryComponent', () => {
  let component: ManualCaseSummaryComponent;
  let fixture: ComponentFixture<ManualCaseSummaryComponent>;

  const mockCaseDetails = {
    caseId: 'manual-case-id-001',
    initiationCode: 'J',
    summonsCode: 'E',
    prosecutor: {
      prosecutionAuthorityId: '31af405e-7b60-4dd8-a244-c24c2d3fa595',
      prosecutingAuthority: 'TFL',
      hasProsecutionReferenceNo: true,
      appliedProsecutorCosts: 249.99,
      chargePostingDate: '2018-10-25'
    },
    prosecutorCaseReference: 'TFL12345',
    originatingOrganisation: 'TFL12345'
  };

  const manualCaseDefendants = [
    {
      individual: {
        personalInformation: {
          firstName: 'Defendant',
          lastName: 'One'
        }
      },
      offences: []
    },
    {
      individual: {
        personalInformation: {
          firstName: 'Defendant',
          lastName: 'Two'
        }
      },
      offences: [
        {
          offenceCode: 'RT88584B',
          offenceWording: 'Caught Driving On Phone'
        }
      ]
    },
    {
      individual: {
        personalInformation: {
          firstName: 'Defendant',
          lastName: 'Three'
        }
      },
      offences: []
    }
  ] as ManualCaseDefendant[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManualCaseSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        ManualCaseOffenceStateService,
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(ManualCaseSummaryComponent);
    component = fixture.componentInstance;
    component.caseDetails = mockCaseDetails;
    component.defendants = [];
    component.prosecutors = [];
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should emit expected manual case path on edit', () => {
    component.defendants = manualCaseDefendants;
    spyOn(component.edit, 'emit');
    component.onEdit('edit-prosecutor');
    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith('edit-prosecutor');
  });

  it('should emit expected manual case path on add', () => {
    component.defendants = manualCaseDefendants;
    spyOn(component.add, 'emit');
    component.onAdd('edit-prosecutor');
    fixture.detectChanges();
    expect(component.add.emit).toHaveBeenCalledWith('edit-prosecutor');
  });

  it('should emit expected manual case path on remove', () => {
    component.defendants = manualCaseDefendants;
    spyOn(component.remove, 'emit');
    component.onRemove('edit-prosecutor');
    fixture.detectChanges();
    expect(component.remove.emit).toHaveBeenCalledWith('edit-prosecutor');
  });

  it('isSJP should return true if initiationCode is S', () => {
    expect(component.isSJP()).toBeTruthy();
  });

  it('isSJP should return false if initiationCode is not S', () => {
    component.caseDetails = { initiationCode: 'c' } as ManualCase;
    expect(component.isSJP()).toBeFalsy();
  });

  it('should return the name of defendants with missing offence', () => {
    component.caseDetails = { initiationCode: 'c' } as ManualCase;
    component.defendants = manualCaseDefendants;
    component.ngOnChanges();

    expect(component.defendantNames[0].lastName).toEqual('One');
    expect(component.defendantNames[1].lastName).toEqual('Three');
  });

  it('should return the hasAllOffencesAocpEligible', () => {
    component.caseDetails = { initiationCode: 'c' } as ManualCase;
    component.defendants = [
      {
        individual: {
          personalInformation: {
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            offenceCode: 'RT88584B',
            aocpEligible: true,
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    expect(component.hasAllOffencesAocpEligible()).toEqual(true);
  });

  it('should return the victim Surcharge', () => {
    component.caseDetails = { initiationCode: 'c' } as ManualCase;
    component.defendants = [
      {
        individual: {
          personalInformation: {
            firstName: 'Defendant',
            lastName: 'Two'
          }
        },
        offences: [
          {
            aocpStandardPenalty: '100',
            offenceCode: 'RT88584B',
            aocpEligible: true,
            offenceWording: 'Caught Driving On Phone'
          }
        ]
      }
    ] as ManualCaseDefendant[];

    expect(component.getVictimSurcharge(200)).toEqual(34);
    expect(component.totalAocpFine).toBe(334);
  });
});
