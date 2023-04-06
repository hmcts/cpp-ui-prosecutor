import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Prosecutor } from '@cpp/reference-data';
import { ProsecutorType } from '../core';

@Component({
  templateUrl: './prosecutor-search.component.html',
  selector: 'prosecutor-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ProsecutorSearchComponent implements OnInit {
  @Input() prosecutorRouteType: ProsecutorType;
  @Input() searchLabel = 'Prosecuting authority (Original informant on the case)';
  @Input() selectedProsecutor?: Prosecutor;
  @Input() hasNpp = true;
  @Input() canCreate = true;
  @Input() disabled = false;
  @Output() prosecutorSelected = new EventEmitter<Prosecutor>();
  includeNonStandardOrganisations = false;

  ngOnInit(): void {
    this.includeNonStandardOrganisations = this.selectedProsecutor
      ? !this.selectedProsecutor.standard
      : false;
  }

  filterByNonStandardOrganisation = (prosecutor: Prosecutor) => {
    if (this.includeNonStandardOrganisations) {
      return !prosecutor.cpsFlag;
    }

    return !prosecutor.cpsFlag && prosecutor.standard === true;
  };
}
