import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkCoreModule, PdkCppPatternModule } from '@cpp/pdk';
import { LayoutComponent } from '../layout.component';

describe('Layout', () => {
  let fixture: ComponentFixture<LayoutTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, LayoutTestComponent],
      imports: [CommonModule, PdkCoreModule, PdkCppPatternModule]
    });

    fixture = TestBed.createComponent(LayoutTestComponent);
    fixture.detectChanges();
  }));

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with online status', () => {
    fixture.componentInstance.offline = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with api error', () => {
    fixture.componentInstance.apiError = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly with activity', () => {
    fixture.componentInstance.activity = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly when search is enabled', () => {
    fixture.componentInstance.searchEnabled = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should propagate a `search` event', () => {
    fixture.debugElement.query(By.directive(LayoutComponent)).componentInstance.search.emit('*');

    expect(fixture.componentInstance.search).toHaveBeenCalledWith('*');
  });

  @Component({
    selector: 'app-layout-test',
    template: `
      <app-layout
        [activity]="activity"
        [apiError]="apiError"
        [headerNavItems]="headerNavItems"
        [offline]="offline"
        [searchEnabled]="searchEnabled"
        (search)="search($event)"
      >
      </app-layout>
    `
  })
  class LayoutTestComponent {
    headerNavItems = [
      {
        title: 'Your account',
        href: 'http://account'
      },
      {
        title: 'Sign out',
        href: 'http://signout'
      }
    ];
    apiError: boolean;
    offline: boolean;
    activity: boolean;
    searchEnabled: boolean;
    search = jest.fn();
  }
});
