import { UploadErrorPipe, errorMessageMap } from '../upload-error.pipe';

describe('UploadErrorPipe', () => {
  const pipe = new UploadErrorPipe();

  it('should return correct label for upload error', () => {
    expect(pipe.transform('DUPLICATED_CASE_FOUND')).toBe('Case already exists');
    expect(pipe.transform('POSTCODE_INVALID_FORMAT')).toBe(errorMessageMap.POSTCODE_INVALID_FORMAT);
  });

  it('should throw error if its invalid key', () => {
    expect(() => pipe.transform('WRONG_KEY')).toThrow('Invalid key');
  });
});
