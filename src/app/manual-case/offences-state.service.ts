import { ManualCaseDefendant } from '../core/model/manual-case-defendant';
import { Injectable } from '@angular/core';
import { cloneDeep, merge, flatten, omit } from 'lodash';
import uuid from 'uuid/v4';
import { ManualCaseOffence } from '../core/model/manual-case-offence';
import { OffenceModeOfTrialType } from '../core/model/reference-data-interfaces/offence-type';

export interface OffenceIdsWithDefendants {
  [offenceCode: string]: { defendants: ManualCaseDefendant[]; offence: ManualCaseOffence };
}

@Injectable({
  providedIn: 'root'
})
export class ManualCaseOffenceStateService {
  public counter: string;
  private total: number;
  private isNew: boolean;
  private currentOffenceId: string;
  private allDefendants: ManualCaseDefendant[] = [];
  private offencesInMemory: ManualCaseOffence[] = [];
  public iterateOffence = true;

  get currentIndex() {
    return this.offencesInMemory.findIndex(d => d.offenceId === this.currentOffenceId);
  }

  getUuid(): string {
    return uuid();
  }

  editOffence(defendantId: string) {
    this.iterateOffence = false;
    this.currentOffenceId = defendantId;
  }

  initialise(defendants: ManualCaseDefendant[]) {
    this.allDefendants = defendants;

    const allOffences = flatten(defendants.filter(d => d.offences).map(d => d.offences));

    const distinctOffences = allOffences.reduce((offenceList, offence) => {
      if (offenceList.findIndex(o => o.offenceId === offence.offenceId) === -1) {
        offenceList.push(offence);
      }
      return offenceList.sort((a, b) => (a.offenceSequenceNumber > b.offenceSequenceNumber ? 1 : -1));
    }, []);

    if (this.offencesInMemory.length) {
      const newOffences = distinctOffences.filter(
        g => this.offencesInMemory.findIndex(d => d.offenceId === g.offenceId) === -1
      );

      if (newOffences.length && this.iterateOffence) {
        this.currentOffenceId = newOffences[0].offenceId;
      }
    }

    if (!this.currentOffenceId && distinctOffences.length) {
      this.currentOffenceId = distinctOffences[0].offenceId;
    }

    this.offencesInMemory = distinctOffences;
  }

  getDefendantOptions(offenceId: string) {
    const defendantOptions = [];

    this.allDefendants.forEach(defendant => {
      let defendentOffence = cloneDeep(this.blankOffence);

      if (defendant.offences && offenceId) {
        const exclude = [
          'isManual',
          'offenceCode',
          'offenceSequenceNumber',
          'offenceLegislation',
          'offenceTitle',
          'offenceId',
          'offenceDateCode',
          'offenceLocation',
          'offenceCommittedDate',
          'offenceCommittedEndDate',
          'offenceWording',
          'drugsOrAlcoholRelated',
          'backDutyAllowed',
          'locationRequired',
          'dynamicParticularFormData',
          'standardOffenceWording'
        ];

        const existingOffence = defendant.offences.find(o => o.offenceId === offenceId);

        if (existingOffence) {
          defendentOffence = merge(this.blankOffence, omit(existingOffence, exclude));
        }
      }

      const defendentLabel =
        defendant.individual && defendant.individual.personalInformation
          ? `${defendant.individual.personalInformation.firstName} ${defendant.individual.personalInformation.lastName}`
          : `${defendant.organisationName}`;

      defendantOptions.push({
        label: defendentLabel,
        value: defendant.id,
        offence: defendentOffence,
        checked: !!(defendentOffence.chargeDate || defendentOffence.laidDate || defendentOffence.arrestDate)
      });
    });

    return defendantOptions;
  }

  getSelectedDefendantIds(offenceId: string) {
    const selectedDefendantIds = [];

    this.allDefendants.forEach(defendant => {
      if (offenceId && defendant.offences && defendant.offences.findIndex(e => e.offenceId === offenceId) > -1) {
        selectedDefendantIds.push(defendant.id);
      }
    });

    return selectedDefendantIds;
  }

  // tslint:disable-next-line: cognitive-complexity
  mapOffenceToDefendants(
    offence: ManualCaseOffence,
    manualCaseDefendants: ManualCaseDefendant[],
    selectedDefendantIds: string[]
  ) {
    const manualCaseDefs = cloneDeep(manualCaseDefendants);
    const allOffences = flatten(manualCaseDefs.filter(d => d.offences).map(d => d.offences));

    manualCaseDefs.forEach((defendant, defendantIndex) => {
      if (!defendant.offences) {
        defendant.offences = [];
      }

      const defendantOption = offence.defendantOptions.find(d => d.value === defendant.id);

      const defendantOffence = merge({}, offence, defendantOption.offence);

      if (defendantIndex > 0) {
        defendantOffence.offenceId = this.getUuid(); // offence id must be unique for each defendant
      }

      if (defendantOffence.aocpEligible) {
        defendantOffence.prosecutorOfferAOCP = offence.prosecutorOfferAOCP;
      }

      if (defendantOffence.drugsOrAlcoholRelated !== 'Y') {
        delete defendantOffence.alcoholRelatedOffence;
      }

      if (defendantOffence.locationRequired !== 'Y') {
        delete defendantOffence.offenceLocation;
      }

      if (!defendantOffence.backDutyAllowed) {
        delete defendantOffence.backDuty;
        delete defendantOffence.backDutyDateFrom;
        delete defendantOffence.backDutyDateFrom;
        delete defendantOffence.backDutyDateTo;
      }

      delete defendantOffence.defendantOptions;

      const index = defendant.offences.findIndex(e => e.offenceId === offence.offenceId);

      if (index === -1 && selectedDefendantIds.indexOf(defendant.id) > -1) {
        if (!defendantOffence.offenceSequenceNumber) {
          defendantOffence.offenceSequenceNumber = allOffences ? allOffences.length + 1 : 1;
        }
        defendant.offences.push(defendantOffence);
      } else if (index > -1 && selectedDefendantIds.indexOf(defendant.id) === -1) {
        defendant.offences = defendant.offences.filter(o => o.offenceId !== offence.offenceId);
      } else if (index > -1 && selectedDefendantIds.indexOf(defendant.id) > -1) {
        defendant.offences[index] = defendantOffence;
      }
    });

    return manualCaseDefs;
  }

  load(): ManualCaseOffence {
    this.isNew = false;
    const idx = this.currentIndex;
    const offence = this.offencesInMemory[idx];

    if (offence) {
      this.currentOffenceId = offence.offenceId;
      this.updateCounter();

      return merge(this.blankOffence, offence);
    }

    return this.getBlankOffence();
  }

  next() {
    if (this.iterateOffence) {
      this.total = 0;
      const idx = this.currentIndex;
      const offence = this.offencesInMemory[idx + 1];

      if (offence && !this.isNew) {
        this.currentOffenceId = offence.offenceId;
        this.updateCounter();

        return merge(this.blankOffence, offence);
      }
    }
    this.iterateOffence = true;
    return null;
  }

  previous() {
    if (this.iterateOffence) {
      this.total = 0;
      const idx = this.currentIndex;
      const offence = this.isNew ? this.offencesInMemory[idx] : this.offencesInMemory[idx - 1];
      this.isNew = false;

      if (offence) {
        this.currentOffenceId = offence.offenceId;
        this.updateCounter();

        return merge(this.blankOffence, offence);
      }

      this.currentOffenceId = undefined;
    }
    return null;
  }

  addNew() {
    this.isNew = true;
    return this.getBlankOffence();
  }

  updateCounter() {
    this.counter = `${this.currentIndex + 1}/${this.offencesInMemory.length}`;
  }

  getBlankOffence() {
    if (this.isNew) {
      this.total = this.total > 0 ? this.total + 1 : this.offencesInMemory.length + 1;
    } else {
      this.total = this.iterateOffence ? 1 : this.offencesInMemory.length + 1;
    }

    this.counter = `${this.total}/${this.total}`;
    return cloneDeep(this.blankOffence);
  }

  get blankOffence() {
    return {
      alcoholRelatedOffence: {}
    } as ManualCaseOffence;
  }

  getDefendantsGroupedByOffenceId(defendants: ManualCaseDefendant[], initiationCode: string): OffenceIdsWithDefendants {
    return defendants.reduce((offences, defendant) => {
      defendant.offences.forEach(offence => {
        if (offence.modeOfTrialDerived.toLowerCase() === OffenceModeOfTrialType.EitherWay) {
          if (initiationCode === 'CO') {
            this.initialiseEitherWayFields(offence);
          }
          offences[offence.offenceId] = { defendants: [defendant], offence };
        }
      });
      return offences;
    }, {} as OffenceIdsWithDefendants);
  }

  private initialiseEitherWayFields(offence: ManualCaseOffence) {
    if (!offence.plea) {
      offence.plea = {
        pleaValue: undefined,
        pleaDate: undefined
      };
    }
    if (!offence.verdict) {
      offence.verdict = {
        verdictType: {
          id: undefined,
          category: undefined,
          categoryType: undefined
        },
        verdictDate: undefined
      };
    }
  }

  hasEitherWayOffence(defendantsWithOffences: ManualCaseDefendant[]): boolean {
    const eitherWay = defendantsWithOffences.findIndex(defendantsWithOffence => {
      const hasEitherWayOffence = defendantsWithOffence.offences.findIndex(
        offence =>
          offence.modeOfTrialDerived && offence.modeOfTrialDerived.toLowerCase() === OffenceModeOfTrialType.EitherWay
      );
      return hasEitherWayOffence >= 0;
    });
    return eitherWay >= 0;
  }
}
