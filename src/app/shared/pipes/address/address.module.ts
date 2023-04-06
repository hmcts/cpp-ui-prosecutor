import { NgModule } from '@angular/core';
import { AddressPipe } from './address.pipe';

@NgModule({
  declarations: [AddressPipe],
  exports: [AddressPipe]
})
export class AddressPipeModule {}
