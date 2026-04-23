import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReviewNotGuiltyPleasComponent } from '../review-not-guilty-pleas.component';
import {
  MOCK_PENDING_DATES_TO_AVOID,
  MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE
} from '../../dashboard/__tests__/test-mock-data';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';

describe('ReviewNotGuiltyPleasComponent', () => {
  let component: ReviewNotGuiltyPleasComponent;
  let fixture: ComponentFixture<ReviewNotGuiltyPleasComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReviewNotGuiltyPleasComponent],
        providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
        teardown: { destroyAfterEach: false }
      });

      fixture = TestBed.createComponent(ReviewNotGuiltyPleasComponent);
      component = fixture.componentInstance;
    })
  );

  it('when the component is created with zero cases then the component should display message "There are no cases to review"', () => {
    component.pleadedNotGuiltyCasesDetail = {
      cases: [],
      count: 0
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('when the component is created with 1 case then the component should be created with out failure', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('then the component should be created with out failure', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  describe('prosecutor filter', () => {
    it('should not display prosecutor filter when there are 2 or fewer prosecutor options', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' }
      ];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).toBeNull();
    });

    it('should display prosecutor filter when there are more than 2 prosecutor options', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' },
        { label: 'TVL', value: 'TVL' }
      ];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).not.toBeNull();
    });

    it('should not display prosecutor filter when prosecutorOptions is empty', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      component.prosecutorOptions = [];
      fixture.detectChanges();

      const prosecutorSelect = fixture.nativeElement.querySelector('pdk-select[name="prosecutor"]');
      expect(prosecutorSelect).toBeNull();
    });
  });

  describe('setFilter event', () => {
    it('should emit setFilter when form is submitted', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      component.region = {
        selectedRegion: 'London',
        regions: [
          { label: 'All', value: 'All' },
          { label: 'London', value: 'London' }
        ],
        prosecutor: 'All'
      };
      component.prosecutorOptions = [
        { label: 'All', value: 'All' },
        { label: 'TFL', value: 'TFL' },
        { label: 'TVL', value: 'TVL' }
      ];
      fixture.detectChanges();

      jest.spyOn(component.setFilter, 'emit');

      const form = fixture.nativeElement.querySelector('form[pdk-form]');
      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      expect(component.setFilter.emit).toHaveBeenCalled();
    });
  });

  describe('viewCase event', () => {
    it('should emit viewCase when defendant name link is clicked', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      fixture.detectChanges();

      jest.spyOn(component.viewCase, 'emit');

      const defendantLink = fixture.nativeElement.querySelector('td[pdk-table-cell] a[pdk-link]');
      defendantLink.click();

      expect(component.viewCase.emit).toHaveBeenCalledWith(MOCK_PENDING_DATES_TO_AVOID.cases[0].caseId);
    });
  });

  describe('region filter', () => {
    it('should always display region filter regardless of prosecutor options', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      component.region = {
        selectedRegion: 'All',
        regions: [
          { label: 'All', value: 'All' },
          { label: 'London', value: 'London' }
        ],
        prosecutor: 'All'
      };
      component.prosecutorOptions = [];
      fixture.detectChanges();

      const regionSelect = fixture.nativeElement.querySelector('pdk-select[name="selectedRegion"]');
      expect(regionSelect).not.toBeNull();
    });
  });

  describe('table display', () => {
    it('should display all case details in table rows', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      fixture.detectChanges();

      const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
      expect(rows.length).toBe(MOCK_PENDING_DATES_TO_AVOID.cases.length);
    });

    it('should display correct number of table columns', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      fixture.detectChanges();

      const headers = fixture.nativeElement.querySelectorAll('[pdk-table-head] th[pdk-table-header]');
      expect(headers.length).toBe(6); // Name, Address, Reference Number, Region, Date of birth, Plea entry
    });

    it('should display warning when no cases match filter', () => {
      component.pleadedNotGuiltyCasesDetail = {
        cases: [],
        count: 5
      };
      fixture.detectChanges();

      const warningTexts = fixture.nativeElement.querySelectorAll('pdk-warning-text');
      // There should be 2 warning texts: one for legal adviser review, one for no cases
      expect(warningTexts.length).toBeGreaterThan(0);

      const noCasesWarning = Array.from(warningTexts).find((el: Element) =>
        el.textContent?.includes('There are no cases to review')
      );
      expect(noCasesWarning).not.toBeNull();
    });
  });

  describe('breadcrumbs', () => {
    it('should display correct breadcrumbs', () => {
      component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
      fixture.detectChanges();

      expect(component.breadcrumbs).toEqual([Breadcrumbs.HOME, Breadcrumbs.REVIEW_NOT_GUILTY_PLEAS]);
    });
  });
});
