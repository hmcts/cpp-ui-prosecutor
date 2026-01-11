import { Injectable } from '@angular/core';
import { capitalize, lowerCase } from 'lodash';
import moment from 'moment';
import { ManualCaseOffence } from '../../core/model/manual-case-offence';
import { Element, ElementType } from '../../core/model/manual-case';
import { FormListOption, Offence } from '../../core';

// The entirety of this service needs
// a complete rewrite. It also needs to be named purposefully.
// It is difficult to maintain in my opinion
@Injectable({
  providedIn: 'root'
})
export class OffenceWordingService {
  // tslint:disable-next-line: cognitive-complexity
  buildParticularWording(
    sections: Element[],
    offenceTypes: FormListOption[],
    editOffence: ManualCaseOffence | Offence
  ) {
    let offenceDateCode: number;
    let wording = '';
    editOffence.offenceDateCode = undefined;

    sections.forEach((el: Element) => {
      if (el.type === ElementType.Dropdown && el.value) {
        offenceDateCode = +el.value;
        const { label } = offenceTypes.find(t => +t.value === offenceDateCode) || { label: '' };
        wording = !!wording ? `${wording} ${lowerCase(label)}` : capitalize(label);
        if (!editOffence.offenceDateCode) {
          editOffence.offenceDateCode = offenceDateCode;
        }
      }

      if (el.type === ElementType.Date && el.value) {
        wording = `${wording} ${moment(new Date(el.value)).format('D MMMM YYYY')}`;
        if (el.valueTwo && offenceDateCode === 4) {
          wording = `${wording} to ${moment(new Date(el.valueTwo)).format('D MMMM YYYY')}`;
        }
        this.setOffenceDates(el, offenceDateCode, editOffence);
      }

      if (
        editOffence &&
        'locationRequired' in editOffence &&
        editOffence.locationRequired === 'Y' &&
        el.type === ElementType.Text &&
        el.label === 'Specify township' &&
        el.value
      ) {
        editOffence.offenceLocation = el.value.trim();
      }

      if (el.type === ElementType.Label && el.label) {
        wording = `${wording} ${el.label.trim()}`;
      }

      if (el.type === ElementType.Text && el.value) {
        wording = `${wording} ${el.value.trim()}`;
      }

      // We check element value is not undefined explicitly as value is 0 index based.
      if (el.type === ElementType.List && el.value !== undefined) {
        const item = el.list.find(i => i.value === el.value);

        if (item.label) {
          const selectedOption = item.label;
          const lowerCased = selectedOption.charAt(0).toLowerCase() + selectedOption.slice(1);
          wording = `${wording} ${lowerCased.trim()}`;
        }

        if (item.children) {
          item.children.forEach((element: Element) => {
            if (element.type === ElementType.Label && element.label) {
              wording = `${wording} ${element.label.trim()}`;
            }

            if (element.type === ElementType.Text && element.value) {
              wording = `${wording} ${element.value.trim()}`;
            }
          });
        }
      }
    });

    return wording;
  }

  private setOffenceDates(element: Element, offenceDateCode: number, offence: ManualCaseOffence | Offence) {
    const startDate = element.value;
    const endDate = element.valueTwo && offenceDateCode === 4 ? element.valueTwo : undefined;
    if ('startDate' in offence && !offence.startDate) {
      offence.startDate = startDate;
      offence.endDate = endDate;
    }

    if ('offenceCommittedDate' in offence && !offence.offenceCommittedDate) {
      offence.offenceCommittedDate = startDate;
      offence.offenceCommittedEndDate = endDate;
    }
  }
}
