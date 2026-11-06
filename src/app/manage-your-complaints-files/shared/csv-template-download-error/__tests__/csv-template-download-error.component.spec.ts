import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CsvTemplateDownloadErrorComponent } from '../csv-template-download-error.component';

@Component({
  selector: 'test-host',
  imports: [CsvTemplateDownloadErrorComponent],
  template: `
    <csv-template-download-error [show]="show">
      <span error-message>Unable to download the CSV template at the moment. Please try again later.</span>
    </csv-template-download-error>
  `
})
class TestHostComponent {
  show = false;
}

describe('CsvTemplateDownloadErrorComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should not show the alert by default', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('pdk-alert'))).toBeNull();
  });

  it('should show the alert with the projected message when show is true', () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-alert'))).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Unable to download the CSV template at the moment');
  });

  it('should hide the alert again when show is set back to false', () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    fixture.componentInstance.show = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pdk-alert'))).toBeNull();
  });
});
