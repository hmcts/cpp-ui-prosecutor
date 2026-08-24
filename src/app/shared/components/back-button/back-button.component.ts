import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdkBackLink, PdkCore } from '@cpp/pdk';

@Component({
  selector: 'back-button',
  imports: [PdkCore, PdkBackLink, RouterLink],
  templateUrl: './back-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackButtonComponent {
  @Input() actionText: string;
  @Input() linkUrl: string;
  @Output() backClick = new EventEmitter<void>();
}
