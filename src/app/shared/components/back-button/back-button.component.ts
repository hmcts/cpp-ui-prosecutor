import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @Input() actionText: string;
  @Input() linkUrl: string;
}
