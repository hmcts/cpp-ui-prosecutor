import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Prosecutor } from '@cpp/reference-data';
import { ManualCase } from '../../../core/model/manual-case';
import { ManualCasePath } from '../../manual-case.interface';
import { PdkCore, PdkDividerComponent, PdkGrid, PdkTable } from "@cpp/pdk";
import { TranslateModule } from '@ngx-translate/core';
import { DashPipe } from '../../../shared/pipes/dash/dash.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'prosecution-case-details',
    templateUrl: './prosecution-case-details.component.html',
    styleUrls: ['./prosecution-case-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PdkCore,PdkDividerComponent, PdkGrid, TranslateModule, DashPipe, CurrencyPipe, DatePipe, PdkTable] 
})
export class ProsecutionCaseDetailsComponent {
  title: string;
  @Input() hasNpp = true;
  @Input() prosecutionCase: ManualCase;
  @Input() prosecutors: Prosecutor[];
  @Output() edit = new EventEmitter<ManualCasePath>();

  getProsecutorCode(): string {
    const prosecutor = this.prosecutors.find(p => p.id === this.prosecutionCase.cpsOrganisationId);
    return prosecutor ? prosecutor.fullName : '';
  }

  onEdit() {
    this.edit.emit(ManualCasePath.EditProsecutor);
  }

  isSJPOrRequisition() {
    return this.prosecutionCase.initiationCode === 'J' || this.prosecutionCase.initiationCode === 'Q';
  }
}
