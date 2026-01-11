import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ManualCaseDefendant } from '../../../core/model/manual-case-defendant';
import { ManualCasePath } from '../../manual-case.interface';
import { ManualCaseDefendantStateService } from '../../defendants-state.service';
import uuid from 'uuid/v4';
import { Nationality, BailStatus, Ethnicity, EthnicityCode } from '../../../core/model';
import { PdkCore, PdkDividerComponent, PdkGridComponent, PdkTable } from '@cpp/pdk';
import { TranslateModule } from '@ngx-translate/core';
import { FullNamePipe } from '../../../shared/pipes/full-name/full-name.pipe';
import { DashPipe } from '../../../shared/pipes/dash/dash.pipe';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AddressPipe } from '../../../shared/pipes/address/address.pipe';
@Component({
  selector: 'manual-defendant-details',
  templateUrl: './manual-defendant-details.component.html',
  styleUrls: ['./manual-defendant-details.component.scss'],
  imports: [
    PdkCore,
    PdkTable,
    PdkDividerComponent,
    PdkGridComponent,
    TranslateModule,
    FullNamePipe,
    DashPipe,
    TitleCasePipe,
    DatePipe,
    AddressPipe
  ]
})
export class DefendantDetailsComponent {
  private defendantStateService = inject(ManualCaseDefendantStateService);

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

  constructor() {}

  getIndividualAliases(index) {
    const defendant = this.defendants[index];
    if (defendant.individualAliases && defendant.individualAliases.length > 0) {
      return defendant.individualAliases.map(a => this.getPersonFullName(a));
    } else {
      return ['-'];
    }
  }

  getOrganisationAliases(index) {
    const defendant = this.defendants[index];
    if (defendant.aliasForCorporate && defendant.aliasForCorporate.length > 0) {
      return defendant.aliasForCorporate.map(a => a.aliasForCorporate);
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
      return this.nationalities.find(n => n.isoCode === iso).nationality;
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
      return this.remandStatuses.find(s => s.statusCode === statusCode).statusDescription;
    }
  }

  getEthnicityName(code) {
    if (this.ethnicities && code) {
      return this.ethnicities.find(n => n.code === code).description;
    } else {
      return '-';
    }
  }

  getObservedEthnicityName(code?: number) {
    if (this.observedEthnicities && code !== undefined) {
      return this.observedEthnicities.find(n => n.ethnicityCode === String(code)).ethnicityDescription;
    } else {
      return '-';
    }
  }

  getAllOffenceAocpEligible(defendant) {
    if (defendant && defendant.offences) {
      return defendant.offences.some(offence => offence.aocpEligible);
    }
    return false;
  }

  getOnlineConvictionForCase(defendant) {
    if (defendant && defendant.offences) {
      return defendant.offences.every(offence => offence.prosecutorOfferAOCP) ? 'Yes' : 'No';
    }
    return 'No';
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
    return this.caseInitiationCode === 'C' || this.caseInitiationCode === 'T' || this.caseInitiationCode === 'CO';
  }

  createUUID() {
    return uuid();
  }
}
