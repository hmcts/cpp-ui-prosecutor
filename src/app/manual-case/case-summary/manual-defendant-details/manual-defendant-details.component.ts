import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManualCaseDefendant } from '../../../core/model/manual-case-defendant';
import { ManualCasePath } from '../../manual-case.interface';
import { ManualCaseDefendantStateService } from '../../defendants-state.service';
import * as uuid from 'uuid/v4';
import { Nationality, BailStatus, Ethnicity, EthnicityCode } from '../../../core/model';

@Component({
  selector: 'manual-defendant-details',
  templateUrl: './manual-defendant-details.component.html',
  styleUrls: ['./manual-defendant-details.component.scss'],
})
export class DefendantDetailsComponent {
  title: string;
  @Input() defendants: ManualCaseDefendant[];
  @Input() nationalities: Nationality[];
  @Input() remandStatuses: BailStatus[];
  @Input() ethnicities: Ethnicity[];
  @Input() observedEthnicities: EthnicityCode[];
  @Input() caseInitiationCode: string;
  @Output() edit = new EventEmitter<ManualCasePath>();
  @Output() add = new EventEmitter<ManualCasePath>();
  @Output() remove = new EventEmitter<any>();

  constructor(private defendantStateService: ManualCaseDefendantStateService) {}

  getIndividualAliases(index) {
    const defendant = this.defendants[index];
    if (defendant.individualAliases && defendant.individualAliases.length > 0) {
      return defendant.individualAliases.map((a) => this.getPersonFullName(a));
    } else {
      return ['-'];
    }
  }

  getOrganisationAliases(index) {
    const defendant = this.defendants[index];
    if (defendant.aliasForCorporate && defendant.aliasForCorporate.length > 0) {
      return defendant.aliasForCorporate.map((a) => a.aliasForCorporate);
    } else {
      return ['-'];
    }
  }

  getPersonFullName(personDetails) {
    if (personDetails) {
      return (
        (personDetails.title ? personDetails.title + ' ' : '') +
        (personDetails.firstName ? personDetails.firstName + ' ' : '') +
        (personDetails.givenName2 ? personDetails.givenName2 + ' ' : '') +
        (personDetails.lastName ? personDetails.lastName.toUpperCase() : '')
      );
    }
  }

  getNationalityName(iso) {
    if (this.nationalities && iso) {
      return this.nationalities.find((n) => n.isoCode === iso).nationality;
    } else {
      return '-';
    }
  }

  guardianIsIndividual(defendant: ManualCaseDefendant) {
    if (defendant.individual.parentGuardianInformation) {
      return !Boolean(defendant.individual.parentGuardianInformation.organisationName);
    }
  }

  getRemandStatus(statusCode) {
    if (statusCode) {
      return this.remandStatuses.find((s) => s.statusCode === statusCode).statusDescription;
    }
  }

  getEthnicityName(code) {
    if (this.ethnicities && code) {
      return this.ethnicities.find((n) => n.code === code).description;
    } else {
      return '-';
    }
  }

  getObservedEthnicityName(code?: number) {
    if (this.observedEthnicities && code !== undefined) {
      return this.observedEthnicities.find((n) => n.ethnicityCode === String(code))
        .ethnicityDescription;
    } else {
      return '-';
    }
  }

  getAllOffenceAocpEligible(defendant) {
    if (defendant) {
      return defendant.offences.some((offence) => offence.aocpEligible);
    }
  }

  getOnlineConvictionForCase(defendant) {
    if (defendant) {
      return defendant.offences.every((offence) => offence.prosecutorOfferAOCP) ? 'Yes' : 'No';
    }
  }

  onEdit(index) {
    this.defendantStateService.editDefendant(this.defendants[index].id);
    this.edit.emit(ManualCasePath.EditDefendant);
  }

  onAdd() {
    this.defendantStateService.editDefendant(this.createUUID());
    this.add.emit(ManualCasePath.NewDefendant);
  }

  onRemove(index) {
    this.remove.emit({ defendantId: this.defendants[index].id });
  }

  isSJP() {
    return this.caseInitiationCode === 'J';
  }

  isTrial() {
    return this.caseInitiationCode === 'T';
  }

  isTrialOrSentence() {
    return this.caseInitiationCode === 'T' || this.caseInitiationCode === 'CO';
  }

  isChargeTrialOrSentence() {
    return (
      this.caseInitiationCode === 'C' ||
      this.caseInitiationCode === 'T' ||
      this.caseInitiationCode === 'CO'
    );
  }

  createUUID() {
    return uuid();
  }
}
