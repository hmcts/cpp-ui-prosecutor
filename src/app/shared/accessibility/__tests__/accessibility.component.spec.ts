import { TestBed, waitForAsync } from '@angular/core/testing';

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccessibilityComponent } from '../accessibility.component';
import { PdkCoreModule, PdkGridModule } from '@cpp/pdk';
import { SharedModule } from '../../shared.module';

import { Observable, of } from 'rxjs';
import en from './../../../../assets/i18n/en.json';

const TRANSLATIONS = {
  EN: en
};
const pageTitle = 'Accessibility statement for ATCM';

class JsonTranslationLoader implements TranslateLoader {
  getTranslation(code: string = ''): Observable<object> {
    return of(TRANSLATIONS[code.toUpperCase()]);
  }
}

describe('AccessibilityComponent', () => {
  let translate: TranslateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AccessibilityComponent, TestAccessibilityComponent],
        imports: [
          PdkCoreModule,
          PdkGridModule,
          SharedModule,
          CommonModule,
          RouterTestingModule.withRoutes([]),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: JsonTranslationLoader }
          })
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [TranslateService],
        teardown: { destroyAfterEach: false }
      });
      translate = TestBed.get(TranslateService);
    })
  );

  it('should render correctly', () => {
    translate.use('en');
    const fixture = TestBed.createComponent(AccessibilityComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render page title correctly', () => {
    translate.use('en');
    const fixture = TestBed.createComponent(AccessibilityComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1[pdk-page-title]').textContent).toContain(pageTitle);
  });

  @Component({
    selector: 'test-accessibility',
    template: `
      <atcm-accessibility></atcm-accessibility>
    `
  })
  class TestAccessibilityComponent {}
});
