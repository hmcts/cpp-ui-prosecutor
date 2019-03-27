import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { AppContainer } from '../app.container';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AppConfigService } from '../../../config';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, RouteConfigLoadStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiError, PendingApiRequest } from '../../actions/api';
import { Title } from '@angular/platform-browser';
import { PdkCoreModule, PdkCppPatternModule } from '@cpp/pdk';
import { HeaderNavItem } from '@cpp/pdk/patterns/cpp.component';
import { reducers } from '../../reducers';
import { global } from '@angular/compiler/src/util';
import { AppRouterContainer } from '../app.router.container';

describe('App page component', () => {
  window.scrollTo = jest.fn();
  const setTitle: jest.Mock = jest.fn();
  const mockParseUrl = jest.fn();

  let fixture: ComponentFixture<AppContainer>;
  let store: Store<any>;
  let mockRouterEvent: BehaviorSubject<any>;
  let routeData: BehaviorSubject<{}>;

  beforeEach(() => {
    mockRouterEvent = new BehaviorSubject<any>({});
    routeData = new BehaviorSubject<{}>({});

    TestBed.configureTestingModule({
      declarations: [AppContainer, AppRouterContainer, MockLayoutComponent],
      imports: [CommonModule, PdkCoreModule, PdkCppPatternModule, StoreModule.forRoot(reducers), RouterTestingModule],
      providers: [
        {
          provide: Title,
          useValue: { setTitle }
        },
        {
          provide: AppConfigService,
          useValue: {
            getAccountUrl: () => 'path/to/account',
            getLogoutUrl: () => 'path/to/logout'
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
        }
      ],
      schemas: []
    });

    store = TestBed.get(Store);
    mockParseUrl.mockReturnValue({ url: 'home' });
    fixture = TestBed.createComponent(AppContainer);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should detect when the app is busy', fakeAsync(() => {
    store.dispatch(new PendingApiRequest({ url: '/' } as any));
    mockRouterEvent.next(new RouteConfigLoadStart(null));
    fixture.detectChanges();
    tick(2);

    expect(fixture).toMatchSnapshot();
  }));

  it('should set the title correctly from route data when set', fakeAsync(() => {
    routeData.next({ title: 'Page title' });
    mockRouterEvent.next(new NavigationEnd(0, 'test/url', 'test/redirect/url'));

    fixture.detectChanges();
    tick();

    expect(setTitle).toHaveBeenCalledWith('Page title');
  }));

  it('should track the offline status of the container', () => {
    fixture.detectChanges();
    global.dispatchEvent(new Event('offline'));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should track the online status of the container', () => {
    fixture.detectChanges();
    global.dispatchEvent(new Event('offline'));
    global.dispatchEvent(new Event('online'));
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should track any api errors', () => {
    store.dispatch(new ApiError({ status: 500 }));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'app-layout',
    template: `
      <div>headerNavItems : {{ headerNavItems | json }}</div>
      <div>activity: {{ activity }}</div>
      <div>offline: {{ offline }}</div>
      <div>apiError: {{ apiError }}</div>
    `
  })
  class MockLayoutComponent {
    @Input() headerNavItems: HeaderNavItem[];
    @Input() activity: boolean;
    @Input() offline: boolean;
    @Input() apiError: boolean;
  }
});
