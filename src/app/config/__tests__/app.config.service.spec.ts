import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../config.service';
import { cold } from 'jasmine-marbles';

describe('AppConfigService', () => {
  let get: jest.Mock;
  let service: AppConfigService;

  beforeEach(() => {
    get = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get }
        },
        AppConfigService
      ]
    });

    service = TestBed.get(AppConfigService);
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
