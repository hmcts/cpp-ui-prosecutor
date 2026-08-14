import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uploadStatus' })
export class UploadStatusPipe implements PipeTransform {
  transform(uploadStatus: string): string {
    switch (uploadStatus) {
      case 'SUCCEEDED':
      case 'COMPLETED':
        return 'Sent to court';
      case 'FAILED':
        return 'Rejected – errors found';
      case 'PROCESSING':
      case 'ACCEPTED':
      default:
        return 'Being checked';
    }
  }
}
