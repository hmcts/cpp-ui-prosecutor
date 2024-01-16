import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ExportCaseDecisionsFormComponent } from '../export-case-decisions-form.component';
import { FromToDatesModule } from '../../../shared/from-to-dates/from-to-dates.module';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PdkFormModule } from '@cpp/pdk';

describe('ExportCaseDecisionsComponent', () => {
  let fixture: ComponentFixture<TestExportCaseDecisionsFormComponent>;
  let formComponent: ExportCaseDecisionsFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportCaseDecisionsFormComponent, TestExportCaseDecisionsFormComponent],
      imports: [FormsModule, PdkFormModule, FromToDatesModule],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestExportCaseDecisionsFormComponent);
    formComponent = fixture.debugElement.query(By.directive(ExportCaseDecisionsFormComponent)).componentInstance;
  });

  it('should compile correctly', () => {
    formComponent.currentDate = '2015-10-10';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit the form', async () => {
    formComponent.currentDate = '2018-01-10';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.loadCaseCount).toHaveBeenCalledWith({
      fromDate: '2018-01-10',
      toDate: '2018-01-10'
    });
  });

  it('should emit errors', fakeAsync(() => {
    formComponent.currentDate = '2015-23-10';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    tick();

    expect(fixture.componentInstance.errors).toHaveBeenCalled();
  }));

  @Component({
    selector: 'export-case-decisions-form-test',
    template: `
      <export-case-decisions-form (loadCaseCount)="loadCaseCount($event)" (errors)="errors($event)">
      </export-case-decisions-form>
    `
  })
  class TestExportCaseDecisionsFormComponent {
    loadCaseCount = jest.fn();
    errors = jest.fn();
  }
});
