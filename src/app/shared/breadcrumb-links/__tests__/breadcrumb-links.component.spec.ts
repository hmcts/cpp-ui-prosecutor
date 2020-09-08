import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BreadcrumbLinksModule } from '../breadcrumb-links.module';
import { Input, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Breadcrumbs } from '../breadcrumb-links.constant';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from '../breadcrumb-links.interface';

describe('BreadcrumbLinksComponent', () => {
  let fixture: ComponentFixture<TestBreadCrumbLinks>;
  let navigate: jest.Mock;
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn() } as any;
  });

  afterAll(() => {
    window.location = location;
  });

  beforeEach(() => {
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [CommonModule, BreadcrumbLinksModule, RouterTestingModule],
      declarations: [TestBreadCrumbLinks],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate,
            url: '/user'
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TestBreadCrumbLinks);
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
    `
  })
  class TestBreadCrumbLinks {
    @Input() breadcrumbs: Breadcrumb[];
    @Input() caseId: string;
  }
});
