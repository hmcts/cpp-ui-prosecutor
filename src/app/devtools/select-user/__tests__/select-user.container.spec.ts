import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdkCoreModule, PdkFormModule } from '@cpp/pdk';
import { SessionService } from '../../index';
import { DevtoolsSelectUserPageComponent } from '../select-user.container';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('devTools - select user container', () => {
  let fixture: ComponentFixture<DevtoolsSelectUserPageComponent>;
  let router: Router;
  let getUserId: jest.Mock;
  let setUserId: jest.Mock;
  let navigate: jest.Mock;
  let selectUserPageComponent: DevtoolsSelectUserPageComponent;
  let selectUserComponent: any;

  beforeEach(() => {
    getUserId = jest.fn(() => 'mockUser');
    setUserId = jest.fn();
    navigate = jest.fn();

    TestBed.configureCompiler({ preserveWhitespaces: false } as any).configureTestingModule({
      declarations: [DevtoolsSelectUserPageComponent],
      imports: [FormsModule, PdkCoreModule, PdkFormModule, RouterTestingModule],
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
      schemas: [NO_ERRORS_SCHEMA]
    });
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(DevtoolsSelectUserPageComponent);
    selectUserPageComponent = fixture.componentInstance;
    selectUserComponent = fixture.debugElement.query(By.css('dev-tools-select-user'));
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
