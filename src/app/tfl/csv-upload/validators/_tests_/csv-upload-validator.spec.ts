import { CsvUploadValidator } from '../csv-upload-validator';
import { CsvUploadValidatorErrorCode } from '../csv-upload.directive';

describe('Csv Upload Validator', () => {
  it('should validate empty Header file', () => {
    validateHeaderFile('', CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER);
  });

  it('should validate empty Offence file', () => {
    validateOffenceFile('', CsvUploadValidatorErrorCode.INVALID_FILE_NAME_OFFENCE);
  });

  it('should validate non CSV Header file', () => {
    validateHeaderFile('non-csv.txt', CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER);
  });

  it('should validate Header file with incorrect pattern (missing date part)', () => {
    validateHeaderFile('nppcase_tfl_000001_header.csv', CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER);
  });

  it('should validate Header file with invalid prefix part', () => {
    validateHeaderFile(
      'xppcase_tfl_000001_header_20170101133045.csv',
      CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER
    );
  });

  it('should validate Header file with not supported prosecutor code', () => {
    validateHeaderFile(
      'nppcase_tvl_000001_header_20170101133045.csv',
      CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER
    );
  });

  it('should validate Header file with invalid non 6 digit serial number', () => {
    validateHeaderFile(
      'nppcase_tfl_0000001_header_20170101133045.csv',
      CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER
    );
  });

  it('should validate Header file with incorrect date format', () => {
    validateHeaderFile(
      'nppcase_tfl_000001_header_170101133045.csv',
      CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER
    );
  });

  it('should validate Header file with offence type', () => {
    validateHeaderFile(
      'nppcase_tfl_000001_offence_20170101133045.csv',
      CsvUploadValidatorErrorCode.INVALID_FILE_NAME_HEADER
    );
  });

  it('should validate Offence file with header type', () => {
    validateOffenceFile(
      'nppcase_tfl_000001_header_20170101133045.csv',
      CsvUploadValidatorErrorCode.INVALID_FILE_NAME_OFFENCE
    );
  });

  it('should validate valid Header file', () => {
    validateHeaderFile('nppcase_tfl_000001_header_20170101133045.csv', null);
  });

  it('should validate valid Offence file', () => {
    validateOffenceFile('nppcase_tfl_000001_offence_20170101133045.csv', null);
  });

  it('should validate valid Header file with invalid Offence file', () => {
    validateHeaderFileIncludingOffence('nppcase_tfl_000001_header_20170101133045.csv', 'invalid-offence.csv', null);
  });

  it('should validate valid Offence file with invalid Offence file', () => {
    validateOffenceFileIncludingOffence('nppcase_tfl_000001_offence_20170101133045.csv', 'invalid-header.csv', null);
  });

  it('should validate valid Header file with valid Offence file (serial numbers do not match)', () => {
    validateHeaderFileIncludingOffence(
      'nppcase_tfl_000001_header_20170101133045.csv',
      'nppcase_tfl_000002_offence_20170101133045.csv',
      CsvUploadValidatorErrorCode.SERIAL_NUMBERS_DIFFERENT
    );
  });

  it('should validate valid Offence file with valid Header file (serial numbers do not match)', () => {
    validateOffenceFileIncludingOffence(
      'nppcase_tfl_000001_offence_20170101133045.csv',
      'nppcase_tfl_000002_header_20170101133045.csv',
      CsvUploadValidatorErrorCode.SERIAL_NUMBERS_DIFFERENT
    );
  });

  it('should validate valid Header file with valid Offence file (dates do not match)', () => {
    validateHeaderFileIncludingOffence(
      'nppcase_tfl_000001_header_20180101133045.csv',
      'nppcase_tfl_000001_offence_20170101133045.csv',
      CsvUploadValidatorErrorCode.DATES_DIFFERENT
    );
  });

  it('should validate valid Offence file with valid Header file (dates do not match)', () => {
    validateOffenceFileIncludingOffence(
      'nppcase_tfl_000001_offence_20180101133045.csv',
      'nppcase_tfl_000001_header_20170101133045.csv',
      CsvUploadValidatorErrorCode.DATES_DIFFERENT
    );
  });

  it('should validate valid Header file with valid Offence file', () => {
    validateHeaderFileIncludingOffence(
      'nppcase_tfl_000001_header_20170101133045.csv',
      'nppcase_tfl_000001_offence_20170101133045.csv',
      null
    );
  });

  it('should validate valid Offence file with valid Header file', () => {
    validateOffenceFileIncludingOffence(
      'nppcase_tfl_000001_offence_20170101133045.csv',
      'nppcase_tfl_000001_header_20170101133045.csv',
      null
    );
  });

  const validateHeaderFile = (fileNameToValidate: string, errorMessage: string) => {
    validateFile(fileNameToValidate, '', errorMessage, 'Header', 'Offence');
  };

  const validateHeaderFileIncludingOffence = (
    fileNameToValidate: string,
    offenceFileNameToValidate: string,
    errorMessage: string
  ) => {
    validateFile(fileNameToValidate, offenceFileNameToValidate, errorMessage, 'Header', 'Offence');
  };

  const validateOffenceFile = (fileNameToValidate: string, errorMessage: string) => {
    validateFile(fileNameToValidate, '', errorMessage, 'Offence', 'Header');
  };

  const validateOffenceFileIncludingOffence = (
    fileNameToValidate: string,
    headerFileNameToValidate: string,
    errorMessage: string
  ) => {
    validateFile(fileNameToValidate, headerFileNameToValidate, errorMessage, 'Offence', 'Header');
  };

  const validateFile = (
    fileNameToValidate: string,
    offenceFileNameToValidate: string,
    errorMessage: string,
    fileType: string,
    fileTypeToValidateAgainst: string
  ) => {
    const validator = new CsvUploadValidator(
      fileNameToValidate,
      offenceFileNameToValidate,
      fileType,
      fileTypeToValidateAgainst
    );

    if (!errorMessage) {
      expect(validator.validate()).toBe(true);
    } else {
      expect(validator.validate()).toBe(false);
      expect(validator.validationErrorCode).toBe(errorMessage);
    }
  };
});
