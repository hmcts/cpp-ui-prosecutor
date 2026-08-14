import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../config.service';
import { cold } from 'jasmine-marbles';
import { CppHttp } from '@cpp/core';
import { of } from 'rxjs';

describe('AppConfigService', () => {
  let get: jest.Mock;
  let query: jest.Mock;
  let pipe: jest.Mock;
  let service: AppConfigService;

  beforeEach(() => {
    get = jest.fn();
    query = jest.fn();
    pipe = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get }
        },
        {
          provide: CppHttp,
          useValue: {
            query: jasmine.createSpy(),
            commandSync: jasmine.createSpy()
          }
        },
        AppConfigService
      ],
      teardown: { destroyAfterEach: false }
    });

    query.mockReturnValue({ pipe });
    pipe.mockReturnValue(of(true));

    service = TestBed.inject(AppConfigService);
  });

  it('should load all configs', () => {
    const apiRoot = 'http://apiroot';
    const idamProfilePage = 'http://idamprofile';
    const idamLogoutPage = 'http://idamlogout';

    const response$ = cold('-a|', {
      a: {
        apiRoot,
        idamProfilePage,
        idamLogoutPage
      }
    });

    get.mockReturnValue(response$);

    service.load().then(() => {
      expect(service.getBaseUrl()).toBe(apiRoot);
      expect(service.getAccountUrl()).toBe(idamProfilePage);
      expect(service.getLogoutUrl()).toBe(idamLogoutPage);
    });
  });
});
