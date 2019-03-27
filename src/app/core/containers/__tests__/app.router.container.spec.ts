import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppRouterContainer } from '../app.router.container';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('App router component', () => {
  let fixture: ComponentFixture<AppRouterContainer>;
  let mockRouterEvent: BehaviorSubject<any>;
  const mockParseUrl = jest.fn();

  beforeEach(() => {
    mockRouterEvent = new BehaviorSubject<any>({});

    TestBed.configureTestingModule({
      declarations: [AppRouterContainer],
      imports: [RouterTestingModule],
      providers: [
        ChangeDetectorRef,
        {
          provide: Router,
          useValue: {
            events: mockRouterEvent,
            url: 'home',
            parseUrl: mockParseUrl
          }
        }
      ],
      schemas: []
    });

    fixture = TestBed.createComponent(AppRouterContainer);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should scroll top when navigate', fakeAsync(() => {
    window.scrollTo = jest.fn();
    fixture.detectChanges();
    mockParseUrl.mockReturnValue({ url: 'home' });
    mockRouterEvent.next(new NavigationEnd(123, 'url', null));
    tick();
    expect(window.scrollTo).toHaveBeenCalled();
  }));
});
