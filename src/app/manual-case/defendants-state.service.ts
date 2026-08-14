import { Injectable } from '@angular/core';
import { cloneDeep, merge } from 'lodash';
import { ManualCaseDefendant } from '../core/model/manual-case-defendant';
@Injectable({
  providedIn: 'root'
})
export class ManualCaseDefendantStateService {
  public counter: string;
  private total: number;
  private isNew: boolean;
  private currentDefendantId: string;
  private defendantsInMemory: ManualCaseDefendant[] = [];
  public iterateDefendant = true;

  get currentIndex() {
    return this.defendantsInMemory.findIndex(d => d.id === this.currentDefendantId);
  }

  editDefendant(defendantId: string) {
    this.iterateDefendant = false;
    this.currentDefendantId = defendantId;
  }

  initialise(defendants: ManualCaseDefendant[]) {
    if (this.defendantsInMemory.length) {
      const newDefendants = defendants.filter(z => this.defendantsInMemory.findIndex(d => d.id === z.id) === -1);
      if (newDefendants.length && this.iterateDefendant) {
        this.currentDefendantId = newDefendants[0].id;
      }
    }
    if (!this.currentDefendantId && defendants.length) {
      this.currentDefendantId = defendants[0].id;
    }
    this.defendantsInMemory = defendants;
  }

  load(): ManualCaseDefendant {
    this.isNew = false;
    const idx = this.currentIndex;
    const defendant = this.defendantsInMemory[idx];
    if (defendant) {
      this.currentDefendantId = defendant.id;
      this.updateCounter();
      return merge(this.blankDefendant, defendant);
    }
    return this.getBlankDefendant();
  }

  next() {
    if (this.iterateDefendant) {
      this.total = 0;
      const idx = this.currentIndex;
      const defendant = this.defendantsInMemory[idx + 1];
      if (defendant && !this.isNew) {
        this.currentDefendantId = defendant.id;
        this.updateCounter();
        return merge(this.blankDefendant, defendant);
      }
    }
    this.iterateDefendant = true;
    return null;
  }

  previous() {
    if (this.iterateDefendant) {
      this.total = 0;
      const idx = this.currentIndex;
      const defendant = this.isNew ? this.defendantsInMemory[idx] : this.defendantsInMemory[idx - 1];
      this.isNew = false;
      if (defendant) {
        this.currentDefendantId = defendant.id;
        this.updateCounter();
        return merge(this.blankDefendant, defendant);
      }
      this.currentDefendantId = undefined;
    }
    return null;
  }
  addNew() {
    this.isNew = true;
    return this.getBlankDefendant();
  }
  updateCounter() {
    this.counter = `${this.currentIndex + 1}/${this.defendantsInMemory.length}`;
  }
  getBlankDefendant() {
    if (this.isNew) {
      this.total = this.total > 0 ? this.total + 1 : this.defendantsInMemory.length + 1;
    } else {
      this.total = this.iterateDefendant ? 1 : this.defendantsInMemory.length + 1;
    }

    this.counter = `${this.total}/${this.total}`;
    return cloneDeep(this.blankDefendant);
  }
  get blankDefendant() {
    return {
      id: '',
      individual: {
        personalInformation: {
          contactDetails: {},
          observedEthnicity: null,
          address: {
            address1: '',
            address2: '',
            address3: '',
            address4: '',
            address5: '',
            postcode: ''
          }
        },
        parentGuardianInformation: {
          personalInformation: {
            contactDetails: {},
            address: {
              address1: '',
              address2: '',
              address3: '',
              address4: '',
              address5: '',
              postcode: ''
            }
          }
        },
        selfDefinedInformation: {
          nationality: '',
          additionalNationality: '',
          ethnicity: ''
        }
      }
    } as ManualCaseDefendant;
  }
}
