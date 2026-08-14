import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCore } from '@cpp/pdk';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProsecutorSearchComponent } from '../prosecutor-search.component';
import { Prosecutor } from '@cpp/reference-data';
import { provideStore } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
describe('ProsecutorSearchComponent', () => {
  let component: ProsecutorSearchComponent;
  let fixture: ComponentFixture<ProsecutorSearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PdkCore, ProsecutorSearchComponent],
        providers: [provideStore(), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsecutorSearchComponent);
    component = fixture.componentInstance;
  });

  it('should match snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render for npp', () => {
    component.hasNpp = false;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('Should not include non standard prosecutor', () => {
    const prosecutorToFilter = {
      standard: false
    } as Prosecutor;

    component.includeNonStandardOrganisations = false;
    const actualFilter = component.filterByNonStandardOrganisation(prosecutorToFilter);

    expect(false).toBe(actualFilter);
  });
  it('Should include standard prosecutor when include non-standard flag is true', () => {
    const prosecutorToFilter = {
      standard: true
    } as Prosecutor;

    component.includeNonStandardOrganisations = true;

    const actualFilter = component.filterByNonStandardOrganisation(prosecutorToFilter);

    expect(true).toBe(actualFilter);
  });

  it('Should include non-standard prosecutor when include non-standard flag is true', () => {
    const prosecutorToFilter = {
      standard: false
    } as Prosecutor;

    component.includeNonStandardOrganisations = true;
    const actualFilter = component.filterByNonStandardOrganisation(prosecutorToFilter);

    expect(true).toBe(actualFilter);
  });
});
