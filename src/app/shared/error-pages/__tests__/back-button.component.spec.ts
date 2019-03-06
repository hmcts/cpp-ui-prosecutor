import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButtonComponent } from '../back-button.component';
import { PdkButtonModule } from '@cpp/pdk';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('BackButtonComponent', () => {
  let fixture: ComponentFixture<TestBackButtonComponent>;
  const mockBack = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackButtonComponent, TestBackButtonComponent],
      imports: [PdkButtonModule, RouterTestingModule],
      providers: [
        {
          provide: Location,
          useValue: {
            back: mockBack
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: mockNavigate
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TestBackButtonComponent);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should go back', () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(mockBack).toHaveBeenCalled();
  });

  it('should navigate to an  url', () => {
    fixture.componentInstance.linkUrl = '/';
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(mockNavigate).toHaveBeenCalledWith(['/']);
  });

  @Component({
    selector: 'back-button-test',
    template: `
      <back-button [linkUrl]="linkUrl"></back-button>
    `
  })
  class TestBackButtonComponent {
    @Input() linkUrl: string;
  }
});
