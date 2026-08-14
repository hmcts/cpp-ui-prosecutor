import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ProsecutionCaseDetailsComponent } from '../prosecution-case-details.component';
import { ManualCase } from '../../../../core/model/manual-case';
import { provideTranslateService } from '@ngx-translate/core';

describe('ProsecutionCaseDetailsComponent', () => {
  let component: ProsecutionCaseDetailsComponent;
  let fixture: ComponentFixture<ProsecutionCaseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProsecutionCaseDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ControlContainer,
        NgForm,
        provideTranslateService({
          lang: 'en',
          fallbackLang: 'en'
        })
      ]
    });

    fixture = TestBed.createComponent(ProsecutionCaseDetailsComponent);
    component = fixture.componentInstance;
    component.prosecutionCase = {
      initiationCode: 'C',
      caseId: '37c1b5bd-49c6-4b14-a763-8af298265c24',
      cpsOrganisationId: '764bff92-a135-34cb-b858-8bb6b4b66301',
      prosecutor: {
        prosecutionAuthorityId: '31af405e-7b60-4dd8-a244-c24c2d3fa595',
        chargePostingDate: '2018-11-11',
        prosecutingAuthority: 'A10AHXX',
        name: 'Transport for London',
        appliedProsecutorCosts: 22.5
      },
      originatingPoliceForce: {
        prosecutionAuthorityId: '41af405e-7b60-4dd8-a244-d4356yh6754h5',
        prosecutingAuthority: 'C21AHRR',
        name: 'Warwick Police',
        appliedProsecutorCosts: 22.5
      },
      originatingOrganisation: 'A10AHXX',
      prosecutorCaseReference: 'TFL123456789'
    };
    component.prosecutors = [
      {
        id: '764bff92-a135-34cb-b858-8bb6b4b66301',
        sequenceNumber: 460,
        majorCreditorCode: 'PF45',
        shortName: 'SURRPF',
        fullName: 'Surrey Police',
        address: {
          address1: 'Southern House',
          postcode: 'GU15 1TL',
          address2: 'Bond Street',
          address3: 'Guildford'
        },
        oucode: '0450000',
        nameWelsh: 'Heddlu Surrey',
        spiOutFlag: true,
        contactEmailAddress: 'test@surreypolice.com',
        policeFlag: true
      }
    ];
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should emit expected manual case path on change click', () => {
    spyOn(component.edit, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('a');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith('edit-prosecutor');
  });

  it('isSJPOrRequisition should return true if initiationCode is J', () => {
    component.prosecutionCase = { initiationCode: 'J' } as ManualCase;
    expect(component.isSJPOrRequisition()).toBeTruthy();
  });

  it('isSJPOrRequisition should return true if initiationCode is R', () => {
    component.prosecutionCase = { initiationCode: 'Q' } as ManualCase;
    expect(component.isSJPOrRequisition()).toBeTruthy();
  });

  it('isSJPOrRequisition should return false if initiationCode is not S or R', () => {
    component.prosecutionCase = { initiationCode: 'A' } as ManualCase;
    expect(component.isSJPOrRequisition()).toBeFalsy();
  });
});
