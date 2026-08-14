import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AppContainer } from '../app.container';
import { provideStore, Store } from '@ngrx/store';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  provideRouter,
  RouteConfigLoadStart,
  Router
} from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ApiError, PendingApiRequest } from '../../actions/api';
import { Title } from '@angular/platform-browser';
import { AppRouterContainer } from '../app.router.container';
import { reducers } from '../../../reducers';
import { provideCppCoreHttpServices } from '@cpp/core';
import { provideCPPApplicationEnvironment } from '@cpp/application';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { SystemAnnouncementsService } from '@cpp/users-groups';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('App page component', () => {
  window.scrollTo = jest.fn();
  const setTitle: jest.Mock = jest.fn();
  const mockParseUrl = jest.fn();

  let fixture: ComponentFixture<AppContainer>;
  let store: Store<any>;
  let mockRouterEvent: BehaviorSubject<any>;
  let routeData: BehaviorSubject<{}>;

  beforeEach(
    waitForAsync(() => {
      mockRouterEvent = new BehaviorSubject<any>({});
      routeData = new BehaviorSubject<{}>({});
      TestBed.configureTestingModule({
        imports: [AppContainer, AppRouterContainer],
        providers: [
          provideCPPApplicationEnvironment({ production: false }),
          provideStore(reducers, { runtimeChecks: {} }),
          provideRouter([]),
          provideCppCoreHttpServices(),
          provideHttpClientTesting(),
          {
            provide: SystemAnnouncementsService,
            useValue: {
              getSystemAnnouncements: jest.fn().mockReturnValue(of({ announcement: undefined }))
            }
          },
          { provide: Title, useValue: { getTitle: jest.fn(), setTitle } },
          {
            provide: Router,
            useValue: {
              events: mockRouterEvent,
              parseUrl: mockParseUrl
            }
          },
          {
            provide: ActivatedRoute,
            useValue: {
              outlet: PRIMARY_OUTLET,
              data: routeData
            }
          },
          provideTranslateService({
            lang: 'en',
            fallbackLang: 'en',
            loader: provideTranslateHttpLoader({
              prefix: 'assets/i18n/',
              suffix: '.json'
            })
          })
        ]
      }).compileComponents();

      store = TestBed.inject(Store);
      mockParseUrl.mockReturnValue({ url: 'home' });
    })
  );

  it('should compile correctly', () => {
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the list of links', () => {
    fixture = TestBed.createComponent(AppContainer);
    const component = fixture.componentInstance;
    component.headerNavItems$.subscribe(headerNavItems => {
      expect(headerNavItems.length).toBe(3);
    });
  });

  it('should check translate service is being called', () => {
    const translate = TestBed.inject(TranslateService);
    const translateSpy = jest.spyOn(translate, 'use');
    fixture = TestBed.createComponent(AppContainer);
    expect(translateSpy).toHaveBeenCalledWith('en');
  });

  it('should detect when the app is busy', fakeAsync(() => {
    store.dispatch(new PendingApiRequest({ url: '/' } as any));
    mockRouterEvent.next(new RouteConfigLoadStart(null));
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    tick(2);

    expect(fixture).toMatchSnapshot();
  }));

  it('should set the title correctly from route data when set', fakeAsync(() => {
    routeData.next({ title: 'Page title' });
    mockRouterEvent.next(new NavigationEnd(0, 'test/url', 'test/redirect/url'));
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    tick(1);

    expect(setTitle).toHaveBeenCalledWith('Page title');
  }));

  it('should track the offline status of the container', () => {
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    window.dispatchEvent(new Event('offline'));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should track the online status of the container', () => {
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    window.dispatchEvent(new Event('offline'));
    window.dispatchEvent(new Event('online'));
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should track any api errors', () => {
    store.dispatch(new ApiError({ status: 500 }));
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly when search is available', () => {
    Object.defineProperty(document, 'baseURI', {
      value: 'https://cpp.nonlive/prosecutor',
      writable: true
    });
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
