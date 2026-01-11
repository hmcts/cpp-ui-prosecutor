import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsSelectUserComponent } from '../select-user.component';
import { FormsModule } from '@angular/forms';
import { DevToolsBackButtonComponent } from '../../back-button/back-button.component';

describe('DevTools - Select User component', () => {
  let fixture: ComponentFixture<DevtoolsSelectUserComponent>;
  let selectUserComponent: DevtoolsSelectUserComponent;
  let button: HTMLButtonElement;
  const userId = 'userId';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, DevtoolsSelectUserComponent, DevToolsBackButtonComponent],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(DevtoolsSelectUserComponent);
    selectUserComponent = fixture.componentInstance;
    button = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    selectUserComponent.users = [
      {
        value: userId,
        label: 'Mock User'
      }
    ];
    fixture.detectChanges();
  });

  it('compiles', () => {
    expect(fixture).toMatchSnapshot();
    expect(button.disabled).toBeTruthy();
  });

  it('it invokes navigate on submit', () => {
    spyOn(selectUserComponent.selectUser, 'emit');
    const selectInput = fixture.debugElement.query(By.css('select[name=userId]')).nativeElement;

    selectInput.selectedIndex = 1;
    selectInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    button.click();

    expect(fixture).toMatchSnapshot();
    expect(selectUserComponent.form.value.userId).toEqual(userId);
    expect(selectUserComponent.selectUser.emit).toBeCalledWith(userId);
  });

  it('it shows error messages when form is submitted with no input', () => {
    button.click();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    const errorElement = fixture.debugElement.query(By.css('pdk-error'));
    expect(errorElement).toBeFalsy();
  });
});
