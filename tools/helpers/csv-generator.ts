import { join } from 'path';
import moment from 'moment';
import { stringFormat } from '../utils';
import { writeFileSync } from 'fs';
import { StagingParam } from '../interfaces';

export class CsvGenerator {
  private readonly headerFileNameFormat = 'nppcase_tfl_000280_header_{0}.csv';
  private readonly offenceFileNameFormat = 'nppcase_tfl_000280_offence_{0}.csv';
  private readonly dateFormatForFileName = 'YYYYMMDDHHmmss';

  public generateHeaderFile({ caseData }: StagingParam): string {
    const filePath = this.getHeaderFilePath();
    writeFileSync(filePath, caseData);
    return filePath;
  }

  public generateOffenceFile({ offenceData }: StagingParam): string {
    const filePath = this.getOffenceFilePath();
    writeFileSync(filePath, offenceData);
    return filePath;
  }

  public generateInvalidFileNameFile(fileName: string) {
    const filePath = join(__dirname, '../fixtures/data', fileName);
    writeFileSync(filePath, 'empty data');
    return filePath;
  }

  private getOffenceFilePath(): string {
    const fileName = stringFormat(this.offenceFileNameFormat, moment().format(this.dateFormatForFileName));

    return join(__dirname, '../fixtures/data', fileName);
  }

  private getHeaderFilePath(): string {
    const fileName = stringFormat(this.headerFileNameFormat, moment().format(this.dateFormatForFileName));

    return join(__dirname, '../fixtures/data', fileName);
  }
}
