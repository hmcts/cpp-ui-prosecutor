import { NgModule } from '@angular/core';
import { FormatAddressPipe } from './format-address.pipe';

@NgModule({
  declarations: [FormatAddressPipe],
  exports: [FormatAddressPipe]
})
export class FormatAddressPipeModule {}
