import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SessionService } from '../../';

import { DevToolsDashboardPageComponent } from '../dashboard.container';
import { DevToolsDashboardComponent } from '../dashboard.component';
import { PdkCoreModule, PdkGridModule } from '@cpp/pdk';
import { DevToolsBackButtonComponent } from '../../back-button/back-button.component';

jest.mock('../../session/users.constant', () => ({
  mockUsers: [
    {
      id: 'userId',
      displayName: 'Charging lawyer 1 - Tina Turner'
    }
  ]
}));

describe('DevTools - dashboard container', () => {
  let fixture: ComponentFixture<DevToolsDashboardPageComponent>;
  let spyOnGetUserId: any;
  let pageComponent: any;
  const mockSessionService = {
    getUserId: () => {}
  };

  beforeEach(() => {
    TestBed.overrideProvider(SessionService, { useValue: mockSessionService });

    TestBed.configureCompiler({ preserveWhitespaces: false } as any).configureTestingModule({
      declarations: [DevToolsDashboardPageComponent, DevToolsDashboardComponent, DevToolsBackButtonComponent],
      imports: [PdkCoreModule, PdkGridModule],
      providers: [
        SessionService,
        {
          provide: Location,
          useValue: {
            back: jest.fn()
          }
        }
      ]
    });

    spyOnGetUserId = spyOn(mockSessionService, 'getUserId');
    fixture = TestBed.createComponent(DevToolsDashboardPageComponent);
    pageComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('compiles', () => {
    expect(fixture).toMatchSnapshot();
    expect(pageComponent.user).toBeFalsy();
  });

  it('user is correctly set', () => {
    const USER_ID = 'userId';
    spyOnGetUserId.and.returnValue(USER_ID);
    pageComponent.ngOnInit();
    expect(pageComponent.user.id).toEqual(USER_ID);
  });
});
