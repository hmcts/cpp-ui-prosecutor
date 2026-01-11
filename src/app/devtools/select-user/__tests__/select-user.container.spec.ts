import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionService } from '../../index';
import { DevtoolsSelectUserPageComponent } from '../select-user.container';

describe('devTools - select user container', () => {
  let fixture: ComponentFixture<DevtoolsSelectUserPageComponent>;
  let router: Router;
  let getUserId: jest.Mock;
  let setUserId: jest.Mock;
  let navigate: jest.Mock;
  let selectUserPageComponent: DevtoolsSelectUserPageComponent;

  beforeEach(() => {
    getUserId = jest.fn(() => 'mockUser');
    setUserId = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [DevtoolsSelectUserPageComponent],
      providers: [
        {
          provide: SessionService,
          useValue: {
            getUserId,
            setUserId
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false }
    });
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(DevtoolsSelectUserPageComponent);
    selectUserPageComponent = fixture.componentInstance;
    jest.spyOn(router, 'navigate');
    jest.spyOn(selectUserPageComponent, 'selectUser');
    fixture.detectChanges();
  });

  it('compiles', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('When selectUser triggered', () => {
    beforeEach(() => {
      selectUserPageComponent.selectUser('mock-id');
    });

    it('sets the userId in session', () => {
      expect(setUserId).toHaveBeenCalledWith('mock-id');
    });

    it('navigates to route', () => {
      expect(navigate).toHaveBeenCalledWith(['dev-tools']);
    });
  });
});
