import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdkBackLink, PdkCore } from '@cpp/pdk';

@Component({
    selector: 'back-button',
    imports: [PdkCore, PdkBackLink, RouterLink],
    templateUrl: './back-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class BackButtonComponent {
  @Input() actionText: string;
  @Input() linkUrl: string;
}
