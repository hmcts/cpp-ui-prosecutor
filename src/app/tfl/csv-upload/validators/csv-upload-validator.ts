import { CsvFileNameParts } from './csv-upload-validator.interface';
import { CsvUploadValidatorErrorCode } from './csv-upload.directive';
import * as moment from 'moment';

export class CsvUploadValidator {
  fileName: string;
  fileNameToValidateAgainst: string;
  fileType: string;
  fileTypeToValidateAgainst: string;
  validationErrorCode: CsvUploadValidatorErrorCode;

  constructor(fileName, fileNameToValidateAgainst, fileType, fileTypeToValidateAgainst) {
    this.fileName = fileName;
    this.fileNameToValidateAgainst = fileNameToValidateAgainst;
    this.fileType = fileType;
    this.fileTypeToValidateAgainst = fileTypeToValidateAgainst;
  }

  validate(): boolean {
    if (!this.validateCsvFilename()) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }

    const fileNameParts = this.parseFileName(this.fileName);
    const fileNameToValidateAgainstParts = this.parseFileName(this.fileNameToValidateAgainst);

    if (!this.validateFilenameParts(fileNameParts, this.fileType)) {
      return false;
    }

    if (
      !!fileNameToValidateAgainstParts &&
      this.validateFilenameParts(fileNameToValidateAgainstParts, this.fileTypeToValidateAgainst)
    ) {
      return this.serialNumberAndDatesMatch(fileNameParts, fileNameToValidateAgainstParts);
    }

    // no comparision is needed if the file which we validate against is invalid
    return true;
  }

  get ValidationErrorCode() {
    return this.validationErrorCode;
  }

  private splitFileNameIntoArray(fileName: string) {
    const fileNameArray = fileName.split('.');
    return fileNameArray[0].split('_');
  }

  private parseFileName(fileName: string): CsvFileNameParts {
    if (!fileName) {
      return null;
    }

    const fileNameArray = this.splitFileNameIntoArray(fileName);
    return {
      nppCase: fileNameArray[0],
      prosecutorCode: fileNameArray[1],
      serialNumber: fileNameArray[2],
      fileType: fileNameArray[3],
      date: fileNameArray[4],
      totalParts: fileNameArray.length
    };
  }

  private validateCsvFilename(): boolean {
    return !!this.fileName && /\.csv$/.test(this.fileName);
  }

  private validateFilenameParts(filenameParts: CsvFileNameParts, fileType): boolean {
    return (
      this.validateNumberOfParts(filenameParts) &&
      this.validateNppCasePrefix(filenameParts) &&
      this.validateProsecutorCode(filenameParts) &&
      this.validateFileType(filenameParts, fileType) &&
      this.validateSerialNumber(filenameParts) &&
      this.validateDates(filenameParts)
    );
  }

  private validateNumberOfParts(filenameParts: CsvFileNameParts): boolean {
    const NUMBER_OF_REQUIRED_PARTS = 5;

    if (filenameParts.totalParts !== NUMBER_OF_REQUIRED_PARTS) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }
    return true;
  }

  private validateNppCasePrefix(filenameParts: CsvFileNameParts): boolean {
    const NPP_CASE_PREFIX = 'nppcase';

    if (filenameParts.nppCase.toLowerCase() !== NPP_CASE_PREFIX) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }
    return true;
  }

  private validateProsecutorCode(filenameParts: CsvFileNameParts): boolean {
    const TFL_PROSECUTOR = 'tfl';

    if (filenameParts.prosecutorCode.toLowerCase() !== TFL_PROSECUTOR) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }

    return true;
  }

  private validateFileType(filenameParts: CsvFileNameParts, fileType): boolean {
    if (filenameParts.fileType.toLowerCase() !== fileType.toLowerCase()) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }

    return true;
  }

  private validateSerialNumber(filenameParts: CsvFileNameParts): boolean {
    const serialNumber = filenameParts.serialNumber;
    const serialNumberRegexp = /^\d{6}$/; // the serial number is always 6 digits

    if (!serialNumber.match(serialNumberRegexp)) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }

    return true;
  }

  private validateDates(filenameParts: CsvFileNameParts): boolean {
    const date = filenameParts.date;
    if (!moment(date, 'YYYYMMDDHHmmss', true).isValid()) {
      this.validationErrorCode = this.getInvalidFileNameMessageKey();
      return false;
    }
    return true;
  }

  private serialNumberAndDatesMatch(filenameParts: CsvFileNameParts, fileNameToValidateAgainstParts: CsvFileNameParts) {
    if (
      !!fileNameToValidateAgainstParts &&
      filenameParts.serialNumber !== fileNameToValidateAgainstParts.serialNumber
    ) {
      this.validationErrorCode = CsvUploadValidatorErrorCode.SERIAL_NUMBERS_DIFFERENT;
      return false;
    }

    if (!!fileNameToValidateAgainstParts && filenameParts.date !== fileNameToValidateAgainstParts.date) {
      this.validationErrorCode = CsvUploadValidatorErrorCode.DATES_DIFFERENT;
      return false;
    }

    return true;
  }

  private getInvalidFileNameMessageKey() {
    if (this.fileType === 'Header') {
      return CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER;
    }

    if (this.fileType === 'Offence') {
      return CsvUploadValidatorErrorCode.INVALID_FILE_NAME_OFFENCE;
    }

    return null;
  }
}
