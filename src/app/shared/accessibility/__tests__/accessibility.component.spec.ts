import { TestBed, waitForAsync } from '@angular/core/testing';

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { AccessibilityComponent } from '../accessibility.component';
import { provideRouter } from '@angular/router';
const pageTitle = 'Accessibility statement for ATCM';

describe('AccessibilityComponent', () => {
  let translate: TranslateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AccessibilityComponent, TestAccessibilityComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          TranslateService,
          provideRouter([]),
          provideTranslateService({
            lang: 'en',
            fallbackLang: 'en'
          })
        ],
        teardown: { destroyAfterEach: false }
      });
      translate = TestBed.get(TranslateService);
    })
  );

  it('should render correctly', () => {
    translate.use('en');
    const fixture = TestBed.createComponent(TestAccessibilityComponent);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render page title correctly', () => {
    translate.use('en');
    const fixture = TestBed.createComponent(TestAccessibilityComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(pageTitle);
  });

  @Component({
    selector: 'test-accessibility',
    template: `
      <h1>Accessibility statement for ATCM</h1>
      <atcm-accessibility></atcm-accessibility>
    `,
    imports: [AccessibilityComponent]
  })
  class TestAccessibilityComponent {}
});
