import { join } from 'path';
import * as moment from 'moment';
import { stringFormat } from '../utils';
import { writeFileSync } from 'fs';
import { StagingParam } from '../interfaces';

export class ZipGenerator {
  private readonly zipFileNameFormat = 'settings.xml.zip';
  private readonly dateFormatForFileName = 'YYYYMMDDHHmmss';

  public generateZipFile({ caseData }: StagingParam): string {
    const filePath = this.getZipFilePath();
    writeFileSync(filePath, caseData);
    return filePath;
  }

  public getZipFilePath(): string {
    const fileName = stringFormat(this.zipFileNameFormat, moment().format(this.dateFormatForFileName));
    return join(__dirname, '../fixtures/data', fileName);
  }

  public generateInvalidFileNameFile(fileName: string) {
    const filePath = join(__dirname, '../fixtures/data', fileName);
    writeFileSync(filePath, 'empty data');
    return filePath;
  }
}
