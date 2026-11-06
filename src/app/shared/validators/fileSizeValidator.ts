import { Directive, ElementRef, inject, input } from '@angular/core';
import { NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[fileSizeLimit]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FileSizeValidatorDirective,
      multi: true
    }
  ]
})
export class FileSizeValidatorDirective implements Validator {
  readonly maxFileSizeBytes = input.required<number>({ alias: 'fileSizeLimit' });

  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  validate(): ValidationErrors | null {
    const file = this.host.nativeElement.files?.[0];
    return file && file.size > this.maxFileSizeBytes() ? { fileSize: true } : null;
  }
}
