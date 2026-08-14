import { Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploadPageComponent } from '../file-upload-page.component';

@Component({
  selector: 'test-host',
  template: `
    <file-upload-page
      [acceptedFileTypes]="['.csv']"
      [hint]="'Test hint'"
      [serverErrorMessage]="serverErrorMessage()"
      (fileSubmitted)="fileSubmitted($event)"
      (errors)="errors($event)"
    >
      <span page-header>Test heading</span>
      <div ngProjectAs="section">
        <p>Projected content</p>
      </div>
      <span submit>Submit</span>
    </file-upload-page>
  `,
  imports: [FileUploadPageComponent]
})
class TestHostComponent {
  fileSubmitted = jest.fn();
  errors = jest.fn();
  serverErrorMessage = signal<string | null>(null);
}

describe('FileUploadPageComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render the projected header, hint and section content', () => {
    expect(fixture.nativeElement.textContent).toContain('Test heading');
    expect(fixture.nativeElement.textContent).toContain('Test hint');
    expect(fixture.nativeElement.textContent).toContain('Projected content');
  });

  it('should configure the file input from acceptedFileTypes', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;

    expect(input.accept).toBe('.csv');
  });

  it('should emit errors when submitting without selecting a file', fakeAsync(() => {
    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
    tick();

    expect(fixture.componentInstance.errors).toHaveBeenCalled();
    expect(fixture.componentInstance.fileSubmitted).not.toHaveBeenCalled();
  }));

  it('should emit fileSubmitted with the selected file on valid submit', fakeAsync(() => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    const file = new File(['a,b,c'], 'complaints.csv', { type: 'text/csv' });
    const fileList = ({
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null)
    } as unknown) as FileList;
    Object.defineProperty(input, 'files', { value: fileList });
    Object.defineProperty(input, 'value', { value: 'C:\\fakepath\\complaints.csv', writable: true });
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
    tick();

    expect(fixture.componentInstance.fileSubmitted).toHaveBeenCalledWith(file);
  }));

  it('should reject a file larger than the max size and not emit fileSubmitted', fakeAsync(() => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    const file = new File(['a,b,c'], 'complaints.csv', { type: 'text/csv' });
    Object.defineProperty(file, 'size', { value: 2 * 1024 * 1024 });
    const fileList = ({
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null)
    } as unknown) as FileList;
    Object.defineProperty(input, 'files', { value: fileList });
    Object.defineProperty(input, 'value', { value: 'C:\\fakepath\\complaints.csv', writable: true });
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.fileSubmitted).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('File size must not exceed 1MB');
  }));

  it('should display a server error message on the field when serverErrorMessage is set', fakeAsync(() => {
    fixture.componentInstance.serverErrorMessage.set('File size must not exceed 2MB');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('File size must not exceed 2MB');
  }));

  it('should emit the server error via the errors output', fakeAsync(() => {
    fixture.componentInstance.serverErrorMessage.set('File size must not exceed 2MB');

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.errors).toHaveBeenCalled();
  }));
});
