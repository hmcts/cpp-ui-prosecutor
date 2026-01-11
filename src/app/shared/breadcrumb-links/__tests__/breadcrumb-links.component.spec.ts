import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Input, Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { Breadcrumbs } from '../breadcrumb-links.constant';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from '../breadcrumb-links.interface';
import { BreadcrumbLinksComponent } from '../breadcrumb-links.component';
describe('BreadcrumbLinksComponent', () => {
  let fixture: ComponentFixture<TestBreadCrumbLinksComponent>;
  let navigate: jest.Mock;
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn() } as any;
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { value: location, writable: true });
  });

  beforeEach(() => {
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [BreadcrumbLinksComponent, TestBreadCrumbLinksComponent],
      providers: [
        provideRouter([]),
        {
          provide: Router,
          useValue: {
            navigate,
            url: '/user'
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestBreadCrumbLinksComponent);
    fixture.componentInstance.breadcrumbs = [
      Breadcrumbs.HOME,
      Breadcrumbs.CASES_MISSING_SJP_NOTICES,
      Breadcrumbs.SEARCH
    ];
    fixture.componentInstance.caseId = 'case-id';
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should navigate with user prefix', () => {
    const link = fixture.debugElement.query(By.css('[data-breadcrumb="home"]')).nativeElement;
    link.click();
    expect(navigate).toHaveBeenCalledWith(['user/']);
  });

  it('should navigate with user prefix', () => {
    const link = fixture.debugElement.query(By.css('[data-breadcrumb="home"]')).nativeElement;
    link.click();
    expect(navigate).toHaveBeenCalledWith(['user/']);
  });

  @Component({
    selector: 'test-breadcrumb-links',
    template: `
      <breadcrumb-links [breadcrumbs]="breadcrumbs" [caseId]="caseId"></breadcrumb-links>
    `,
    imports: [BreadcrumbLinksComponent]
  })
  class TestBreadCrumbLinksComponent {
    @Input() breadcrumbs: Breadcrumb[];
    @Input() caseId: string;
  }
});
