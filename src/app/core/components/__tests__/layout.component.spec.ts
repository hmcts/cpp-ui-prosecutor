import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { PdkCoreModule, PdkCppPatternModule } from '@cpp/pdk';

describe('Layout', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [CommonModule, PdkCoreModule, PdkCppPatternModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    component.headerNavItems = [
      {
        title: 'Your account',
        href: 'http://account'
      },
      {
        title: 'Sign out',
        href: 'http://signout'
      }
    ];
  }));

  it('should render', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with online status', () => {
    component.offline = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with api error', () => {
    component.apiError = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with activity', () => {
    component.activity = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
