import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppContainer } from '../app.container';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from '../../../config';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, RouteConfigLoadStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiError, PendingApiRequest } from '../../actions/api';
import { Title } from '@angular/platform-browser';
import { PdkCoreModule } from '@cpp/pdk';
import { reducers } from '../../reducers';
import { global } from '@angular/compiler/src/util';
import { AppRouterContainer } from '../app.router.container';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApplicationModule } from '@cpp/application';

describe('App page component', () => {
  window.scrollTo = jest.fn();
  const setTitle: jest.Mock = jest.fn();
  const mockParseUrl = jest.fn();

  let fixture: ComponentFixture<AppContainer>;
  let store: Store<any>;
  let mockRouterEvent: BehaviorSubject<any>;
  let routeData: BehaviorSubject<{}>;
  let mockTranslateUse: jest.Mock;

  beforeEach(() => {
    mockRouterEvent = new BehaviorSubject<any>({});
    routeData = new BehaviorSubject<{}>({});
    mockTranslateUse = jest.fn();

    TestBed.configureTestingModule({
      declarations: [AppContainer, AppRouterContainer],
      imports: [
        CommonModule,
        PdkCoreModule,
        ApplicationModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: Title,
          useValue: { setTitle }
        },
        {
          provide: AppConfigService,
          useValue: {
            cppHomeUrl: 'https://cpp.home.nonlive',
            getAccountUrl: () => 'path/to/account',
            getLogoutUrl: () => 'path/to/logout',
            getBaseUrl: () => 'path/to/home',
            getAppUrl: () => 'path/to/home',
            searchEnabled: false
          }
        },
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
        TranslateService
      ],
      schemas: []
    });

    store = TestBed.get(Store);
    mockParseUrl.mockReturnValue({ url: 'home' });
  });

  it('should compile correctly', () => {
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the list of links', () => {
    fixture = TestBed.createComponent(AppContainer);
    const component = fixture.componentInstance;
    expect(component.headerNavItems.length).toBe(4);
  });

  it('should check translate service is being called', () => {
    const translate = TestBed.get(TranslateService);
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
    tick();

    expect(setTitle).toHaveBeenCalledWith('Page title');
  }));

  it('should track the offline status of the container', () => {
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    global.dispatchEvent(new Event('offline'));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should track the online status of the container', () => {
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    global.dispatchEvent(new Event('offline'));
    global.dispatchEvent(new Event('online'));
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
    TestBed.get(AppConfigService).searchEnabled = true;
    fixture = TestBed.createComponent(AppContainer);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
