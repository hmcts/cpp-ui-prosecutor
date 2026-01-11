import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { DevToolsBackButtonComponent } from './back-button.component';
import { By } from '@angular/platform-browser';

describe('DevTools - Select User component', () => {
  let fixture: ComponentFixture<DevToolsBackButtonComponent>;
  const mockBack = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DevToolsBackButtonComponent],
    providers: [
        {
            provide: Location,
            useValue: {
                back: mockBack
            }
        }
    ],
    teardown: { destroyAfterEach: false }
});
    fixture = TestBed.createComponent(DevToolsBackButtonComponent);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should go back when back button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(mockBack).toBeCalled();
  });
});
