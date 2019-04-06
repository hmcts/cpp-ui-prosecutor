import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkErrorSummaryModule, PdkGridModule } from '@cpp/pdk';
import { CsvUploadComponent } from '../csv-upload.component';

describe('CsvUploadComponent', () => {
  let component: CsvUploadComponent;
  let fixture: ComponentFixture<CsvUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsvUploadComponent],
      imports: [PdkCoreModule, PdkGridModule, PdkErrorSummaryModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CsvUploadComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the csv upload component', () => {
    fixture.componentInstance.displayFileSubmittedBanner = false;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display confirmation banner', () => {
    fixture.componentInstance.displayFileSubmittedBanner = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
