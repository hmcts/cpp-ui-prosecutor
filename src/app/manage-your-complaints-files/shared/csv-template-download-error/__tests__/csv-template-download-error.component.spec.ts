import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CsvTemplateDownloadErrorComponent } from '../csv-template-download-error.component';

describe('CsvTemplateDownloadErrorComponent', () => {
  let fixture: ComponentFixture<CsvTemplateDownloadErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CsvTemplateDownloadErrorComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(CsvTemplateDownloadErrorComponent);
  });

  it('should not show the alert by default', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('pdk-alert'))).toBeNull();
  });

  it('should show the alert when show is true', () => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-alert'))).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Unable to download the CSV template at the moment');
  });

  it('should hide the alert again when show is set back to false', () => {
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    fixture.componentRef.setInput('show', false);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-alert'))).toBeNull();
  });
});
