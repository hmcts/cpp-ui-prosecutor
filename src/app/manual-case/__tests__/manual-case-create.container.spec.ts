import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { ExportCaseDecisionsFormComponent } from '../../export-case-decisions/components/export-case-decisions-form.component';
import { InputValues } from '../../shared/from-to-dates/from-to-dates.component';

describe('ExportCaseDecisionsComponent', () => {
  let fixture: ComponentFixture<TestExportCaseDecisionsFormComponent>;
  let formComponent: MockExportCaseDecisionsFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }, provideRouter([])],
      teardown: { destroyAfterEach: false }
    }).overrideComponent(TestExportCaseDecisionsFormComponent, {
      remove: {
        imports: [ExportCaseDecisionsFormComponent]
      },
      add: {
        imports: [MockExportCaseDecisionsFormComponent]
      }
    });

    fixture = TestBed.createComponent(TestExportCaseDecisionsFormComponent);
    fixture.detectChanges();
    formComponent = fixture.debugElement.query(By.directive(MockExportCaseDecisionsFormComponent)).componentInstance;
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
    `,
    imports: [FormsModule, ExportCaseDecisionsFormComponent]
  })
  class TestExportCaseDecisionsFormComponent {
    loadCaseCount = jest.fn();
    errors = jest.fn();
  }

  @Component({
    selector: 'export-case-decisions-form',
    template: `
      <form (ngSubmit)="submit(form.value)">
        <input type="text" [(ngModel)]="currentDate" name="currentDate" />
        <button type="submit">Search</button>
      </form>
    `,
    imports: [FormsModule]
  })
  class MockExportCaseDecisionsFormComponent {
    currentDate = '';
    @ViewChild(NgForm, { static: true }) form: NgForm;
    @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
    @Output() errors: EventEmitter<ValidationError[]> = new EventEmitter();

    submit() {
      this.errors.emit();
      this.loadCaseCount.emit({
        fromDate: this.currentDate,
        toDate: this.currentDate
      });
    }
  }
});
