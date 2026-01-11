import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Case } from '../../../contexts/sjp';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { DatesToAvoidFormComponent } from '../dates-to-avoid-form.component';
import { By } from '@angular/platform-browser';
import { mockNativeMethods } from '../../../test/jest-mock';
import { ActivatedRoute } from '@angular/router';

describe('DatesToAvoidFormComponent', () => {
  let fixture: ComponentFixture<TestDatesToAvoidFormComponent>;
  let formComponent: DatesToAvoidFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDatesToAvoidFormComponent, DatesToAvoidFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '123' }
            }
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });
    mockNativeMethods();
    fixture = TestBed.createComponent(TestDatesToAvoidFormComponent);
    fixture.componentInstance.kase = MOCK_CASE;
    formComponent = fixture.debugElement.query(By.directive(DatesToAvoidFormComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the dates to avoid', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should submit the form', () => {
    fixture.detectChanges();
    formComponent.kase.datesToAvoid = 'dates to avoid in test';

    const datesToAvoidTextArea = fixture.debugElement.query(By.css('textarea[name=datesToAvoid]')).nativeElement;
    datesToAvoidTextArea.value = 'dates to avoid in test';
    datesToAvoidTextArea.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(fixture.componentInstance.formSubmit).toHaveBeenCalledWith('dates to avoid in test');
  });

  @Component({
    selector: 'test-dates-to-avoid-form',
    template: `
      <dates-to-avoid-form [kase]="kase" (formSubmit)="formSubmit($event)"></dates-to-avoid-form>
    `,
    imports: [DatesToAvoidFormComponent]
  })
  class TestDatesToAvoidFormComponent {
    kase: Case;
    formSubmit = jest.fn();
  }
});
