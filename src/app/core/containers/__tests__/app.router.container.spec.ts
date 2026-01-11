import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { AppRouterContainer } from '../app.router.container';
import { BehaviorSubject } from 'rxjs';

describe('App router component', () => {
  let fixture: ComponentFixture<AppRouterContainer>;
  let mockRouterEvent: BehaviorSubject<any>;
  const mockParseUrl = jest.fn();

  beforeEach(() => {
    mockRouterEvent = new BehaviorSubject<any>({});

    TestBed.configureTestingModule({
      imports: [AppRouterContainer],
      providers: [
        ChangeDetectorRef,
        {
          provide: Router,
          useValue: {
            events: mockRouterEvent,
            url: 'home#fragment',
            parseUrl: mockParseUrl
          }
        },
        provideRouter([])
      ],
      schemas: [],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(AppRouterContainer);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should scroll to the view if there is a fragment', fakeAsync(() => {
    const dummyObject = { scrollIntoView: jest.fn() };
    const mockQuerySelector = jest.fn();
    document.querySelector = mockQuerySelector;
    fixture.detectChanges();

    mockParseUrl.mockReturnValue({ fragment: 'fragment' });
    mockQuerySelector.mockReturnValue(dummyObject);
    mockRouterEvent.next(new NavigationEnd(123, 'home#fragment', null));
    tick();
    expect(dummyObject.scrollIntoView).toHaveBeenCalled();
  }));
});
