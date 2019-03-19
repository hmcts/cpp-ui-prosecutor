import { NgModule } from '@angular/core';
import { DownloadDocumentComponent } from './download-document.component';
import { FormatDatePipeModule } from '../../../shared/pipes';
import { PdkCoreModule, PdkFileDownloadIconModule } from '@cpp/pdk';
import { DocFileNamePipe } from './doc-file-name.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DownloadDocumentComponent, DocFileNamePipe],
  imports: [CommonModule, PdkCoreModule, PdkFileDownloadIconModule, FormatDatePipeModule],
  providers: [DocFileNamePipe],
  exports: [DownloadDocumentComponent]
})
export class DownloadDocumentModule {}
