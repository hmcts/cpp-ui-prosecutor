import { UploadStatusPipe } from '../upload-status.pipe';

describe('UploadStatusPipe', () => {
  const pipe = new UploadStatusPipe();

  it('should return correct label for upload status', () => {
    expect(pipe.transform('SUCCEEDED')).toBe('Sent to court');
    expect(pipe.transform('COMPLETED')).toBe('Sent to court');
    expect(pipe.transform('PROCESSING')).toBe('Being checked');
    expect(pipe.transform('')).toBe('Being checked');
    expect(pipe.transform('FAILED')).toBe('Rejected – errors found');
  });
});
