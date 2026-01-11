import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationDecisionDetailsComponent } from '../application-decision-details.component';

describe('ApplicationDecisionDetailsComponent', () => {
  let fixture: ComponentFixture<ApplicationDecisionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApplicationDecisionDetailsComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(ApplicationDecisionDetailsComponent);
    fixture.componentInstance.applicationDecision = {
      granted: null
    };
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  describe('Stat dec', () => {
    it('should display stat dec details when granted', () => {
      fixture.componentInstance.applicationDecision = {
        granted: true,
        applicationType: 'STAT_DEC'
      };
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="reopening-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="application-rejected"');
    });

    it('should display stat dec details when granted, and not display reasons when not out of time', () => {
      fixture.componentInstance.applicationDecision = {
        granted: true,
        applicationType: 'STAT_DEC'
      };
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="reopening-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="application-rejected"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('Reasons');
    });

    it('should display out of time reason when out of time', () => {
      fixture.componentInstance.applicationDecision = {
        granted: true,
        applicationType: 'STAT_DEC',
        outOfTime: true,
        outOfTimeReason: 'In hospital'
      };
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('Reasons: In hospital');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="reopening-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="application-rejected"');
    });

    it('should display rejected reason', () => {
      fixture.componentInstance.applicationDecision = {
        granted: false,
        applicationType: 'STAT_DEC',
        rejectionReason: 'Test rejection reason'
      };
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('Refused: Test rejection reason');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="application-rejected"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="stat-dec-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="stat-dec-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="reopening-details"');
    });
  });

  describe('Reopening', () => {
    it('should display reopening details when granted', () => {
      fixture.componentInstance.applicationDecision = {
        granted: true,
        applicationType: 'REOPENING',
        previousFinalDecision: '2020-12-01T16:10:28.259Z'
      };
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="reopening-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="reopening-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="stat-dec-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="stat-dec-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="application-rejected"');
    });

    it('should display rejected reason', () => {
      fixture.componentInstance.applicationDecision = {
        granted: false,
        applicationType: 'REOPENING',
        rejectionReason: 'Test rejection reason'
      };
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('Refused: Test rejection reason');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="application-rejected"');
      expect(fixture.debugElement.nativeElement.innerHTML).toContain('data-role="reopening-details"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="reopening-granted"');
      expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('data-role="stat-dec-details"');
    });
  });
});
