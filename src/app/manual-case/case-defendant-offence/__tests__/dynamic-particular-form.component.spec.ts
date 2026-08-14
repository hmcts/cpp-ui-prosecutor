import { FormsModule } from '@angular/forms';
import { DynamicParticularFormComponent } from '../dynamic-particular-form.component';
import { ElementType, Element, OffenceWordingMessage } from '../../../core/model/manual-case';
import { OffenceWordingService } from '../../case-offence-parsing/offence-wording.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormListOption, Offence } from '../../../core';
import { By } from '@angular/platform-browser';

const offenceTypes = [
  { value: 3, label: 'after' },
  { value: 4, label: 'between' }
];

const sections = [
  {
    type: ElementType.Dropdown,
    label: 'Offence date type',
    value: 4
  },
  {
    type: ElementType.Date,
    label: 'Specify Date',
    value: '2018-10-15',
    valueTwo: '2018-12-20'
  },
  {
    type: ElementType.Label,
    label: 'occurring at'
  },
  {
    type: ElementType.Text,
    label: 'Specify township',
    value: 'Liverpool street'
  },
  {
    type: ElementType.List,
    value: 'Allowed another, namely',
    list: [
      {
        type: ElementType.Radio,
        label: 'Allowed another, namely',
        value: 'Allowed another, namely',
        children: [
          {
            type: ElementType.Text,
            label: 'Specify person',
            value: 'Mr. Dora DIMSUM'
          },
          {
            type: ElementType.Label,
            label: 'to have possession of an official document, namely'
          },
          {
            type: ElementType.Text,
            label: 'Specify document',
            value: 'The secret code'
          },
          {
            type: ElementType.Label,
            label: 'issued for your use alone'
          }
        ]
      },
      {
        type: ElementType.Radio,
        label: 'Communicated to',
        value: 'Communicated to',
        children: [
          {
            type: ElementType.Text,
            label: 'Specify to whom word was communicated'
          },
          {
            type: ElementType.Label,
            label: 'a secret official code word issued for use alone'
          }
        ]
      }
    ]
  }
] as Element[];

describe('Organisation Defendant Form Component', () => {
  let component: TestHostDynamicFormComponent;
  let fixture: ComponentFixture<TestHostDynamicFormComponent>;

  const asyncSetUpData = async (data: OffenceWordingMessage) => {
    component.offenceTypes = offenceTypes;
    component.data = data;
    component.offenceWording = `**`;
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    await fixture.whenRenderingDone();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot(), TestHostDynamicFormComponent, DynamicParticularFormComponent],
      providers: [OffenceWordingService]
    });

    fixture = TestBed.createComponent(TestHostDynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should render component correctly', async () => {
    await asyncSetUpData({ sections, title: '' });
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should update offence wording when particulars form is updated', async () => {
    await asyncSetUpData({ sections, title: '' });
    const dynamicForm = fixture.debugElement.query(By.directive(DynamicParticularFormComponent)).componentInstance;
    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
    fixture.detectChanges();

    expect(component.dynamicFormChange).toHaveBeenCalledWith({ sections, title: '' });
    expect(dynamicForm.offenceWording).toEqual(
      // tslint:disable-next-line:max-line-length
      'Between 15 October 2018 to 20 December 2018 occurring at Liverpool street allowed another, namely Mr. Dora DIMSUM to have possession of an official document, namely The secret code issued for your use alone'
    );
    expect(dynamicForm.isEditMode).toBeFalsy();
  });

  it('should throw error build wording from a blank form', async () => {
    const blankSections = [
      {
        type: ElementType.Dropdown,
        label: 'Offence date type'
      },
      {
        type: ElementType.Date,
        label: 'Specify Date'
      },
      {
        type: ElementType.List,
        list: []
      }
    ] as Element[];
    await asyncSetUpData({ sections: blankSections, title: '' });
    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click();
    expect(component.onError.mock.calls[0][0]).toMatchSnapshot();
  });
});

@Component({
  selector: 'host-dynamic-form',
  template: `
    <dynamic-particular-form
      name="dynamicParticularFormData"
      [offenceDateTypes]="offenceTypes"
      [ngModel]="data"
      (ngModelChange)="dynamicFormChange($event)"
      [offenceWording]="offenceWording"
      (formError)="onError($event)"
    >
    </dynamic-particular-form>
  `,
  imports: [FormsModule, DynamicParticularFormComponent]
})
class TestHostDynamicFormComponent {
  private wordingService = inject(OffenceWordingService);

  constructor() {}
  data: OffenceWordingMessage;
  offenceWording: string;
  offenceTypes: FormListOption[];
  dynamicFormChange = jest.fn((data: OffenceWordingMessage) => {
    this.offenceWording = this.wordingService.buildParticularWording(data.sections, this.offenceTypes, {} as Offence);
  });
  onError = jest.fn();
}
