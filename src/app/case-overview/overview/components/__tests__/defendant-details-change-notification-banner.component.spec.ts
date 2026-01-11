import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefendantDetailsChangeNotificationBannerComponent } from '../defendant-details-change-notification-banner.component';
import { DefendantDetailUpdateRequest, LegalEntityDetails, PersonalDetails } from '../../../../contexts/sjp';
import { MOCK_CASE, MOCK_CASE_LEGAL_ENTITY_DEFENDANT } from '../../../../case-overview/__tests__/test-mock-data';

describe('DefendantDetailsChangeNotificationBannerComponent', () => {
  let fixture: ComponentFixture<MockDefendantDetailsChangeNotificationBannerComponent>;
  const personDefendantUpdateRequest: DefendantDetailUpdateRequest = {
    address: {
      address1: 'address',
      address3: 'Croydon',
      postcode: 'CR0 1XG'
    },
    addressUpdated: true,
    dateOfBirth: '2000-01-01',
    dobUpdated: true,
    firstName: 'Jorge',
    lastName: 'Batz',
    nameUpdated: true,
    status: 'PENDING'
  };
  const legalEntityDefendantUpdateRequest: DefendantDetailUpdateRequest = {
    address: {
      address1: 'address',
      address3: 'Croydon',
      postcode: 'CR0 1XG'
    },
    addressUpdated: true,
    legalEntityName: 'legalEntityName',
    nameUpdated: true,
    status: 'PENDING'
  };

  const expectToContain = (textContent: string, values: string[]) => {
    values.forEach(value => {
      expect(textContent).toContain(value);
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockDefendantDetailsChangeNotificationBannerComponent,
        DefendantDetailsChangeNotificationBannerComponent
      ]
    });
  });

  describe('Person defendant', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MockDefendantDetailsChangeNotificationBannerComponent);
      fixture.componentInstance.personalDetails = MOCK_CASE.defendant.personalDetails;
    });

    it('should not display notification banner if there are no requested changes', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = undefined;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const notificationBanner = compiled.querySelector('pdk-notification-banner');
      expect(notificationBanner).toBeNull();
      expect(fixture).toMatchSnapshot();
    });

    it('should display notification banner if status is PENDING', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = personDefendantUpdateRequest;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const textContent = compiled.querySelector('pdk-notification-banner').textContent;
      const values = [
        'The following defendant details have been updated and are awaiting approval',
        'Name',
        'Date of birth',
        'Address'
      ];
      expectToContain(textContent, values);
      expect(fixture).toMatchSnapshot();
    });

    it('should display notification banner if status is UPDATED', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = {
        ...personDefendantUpdateRequest,
        status: 'UPDATED'
      };
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const textContent = compiled.querySelector('pdk-notification-banner').textContent;
      const values = ['The following defendant details have been updated', 'Name', 'Date of birth', 'Address'];
      expectToContain(textContent, values);
      expect(fixture).toMatchSnapshot();
    });

    it('should not display notification banner if status is REJECTED', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = {
        status: 'REJECTED'
      };
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const notificationBanner = compiled.querySelector('pdk-notification-banner');
      expect(notificationBanner).toBeNull();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('Legal entity defendant', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MockDefendantDetailsChangeNotificationBannerComponent);
      fixture.componentInstance.legalEntityDetails = MOCK_CASE_LEGAL_ENTITY_DEFENDANT.defendant.legalEntityDetails;
    });

    it('should not display notification banner if there are no requested changes', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = undefined;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const notificationBanner = compiled.querySelector('pdk-notification-banner');
      expect(notificationBanner).toBeNull();
      expect(fixture).toMatchSnapshot();
    });

    it('should display notification banner if status is PENDING', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = legalEntityDefendantUpdateRequest;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const textContent = compiled.querySelector('pdk-notification-banner').textContent;
      const values = ['The following defendant details have been updated and are awaiting approval', 'Name', 'Address'];
      expectToContain(textContent, values);
      expect(fixture).toMatchSnapshot();
    });

    it('should display notification banner if status is UPDATED', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = {
        ...legalEntityDefendantUpdateRequest,
        status: 'UPDATED'
      };
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const textContent = compiled.querySelector('pdk-notification-banner').textContent;
      const values = ['The following defendant details have been updated', 'Name', 'Address'];
      expectToContain(textContent, values);
      expect(fixture).toMatchSnapshot();
    });

    it('should not display notification banner if status is REJECTED', () => {
      fixture.componentInstance.defendantDetailUpdateRequest = {
        status: 'REJECTED'
      };
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const notificationBanner = compiled.querySelector('pdk-notification-banner');
      expect(notificationBanner).toBeNull();
      expect(fixture).toMatchSnapshot();
    });
  });

  @Component({
    selector: 'defendant-details-change-notification-banner-test',
    template: `
      <defendant-details-change-notification-banner
        [personalDetails]="personalDetails"
        [legalEntityDetails]="legalEntityDetails"
        [defendantDetailUpdateRequest]="defendantDetailUpdateRequest"
      ></defendant-details-change-notification-banner>
    `,
    imports: [DefendantDetailsChangeNotificationBannerComponent]
  })
  class MockDefendantDetailsChangeNotificationBannerComponent {
    @Input() personalDetails: PersonalDetails;
    @Input() legalEntityDetails: LegalEntityDetails;
    @Input() defendantDetailUpdateRequest: DefendantDetailUpdateRequest;
  }
});
