import { buildAddCourtDocumentRequest, findDocumentTypeId } from '../manage-your-complaints-files';

describe('buildAddCourtDocumentRequest', () => {
  it('builds an add-court-document request from a file, material id and document type id', () => {
    const file = new File(['a,b,c'], 'test.csv', { type: 'text/csv' });

    const result = buildAddCourtDocumentRequest(file, 'material-id-1', 'document-type-id-1');

    expect(result).toEqual({
      courtDocument: {
        courtDocumentId: expect.any(String),
        documentCategory: {
          applicationDocument: {
            applicationId: '4cf684b8-ae91-405c-96a1-adebad1d5411'
          }
        },
        name: 'test.csv',
        documentTypeId: 'document-type-id-1',
        documentTypeDescription: 'Applications',
        mimeType: 'text/csv',
        containsFinancialMeans: false,
        sendToCps: false,
        materials: [
          {
            id: 'material-id-1',
            receivedDateTime: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T00:00:00\.000Z$/)
          }
        ]
      }
    });
  });

  it('sends the material receivedDateTime as midnight UTC on the current date', () => {
    const file = new File(['a'], 'test.csv', { type: 'text/csv' });

    const result = buildAddCourtDocumentRequest(file, 'material-id-1', 'document-type-id-1');

    const expectedDate = new Date();
    expectedDate.setUTCHours(0, 0, 0, 0);
    expect(result.courtDocument.materials[0].receivedDateTime).toBe(expectedDate.toISOString());
  });

  it('generates a new courtDocumentId on each call', () => {
    const file = new File(['a'], 'test.csv', { type: 'text/csv' });

    const first = buildAddCourtDocumentRequest(file, 'material-id-1', 'document-type-id-1');
    const second = buildAddCourtDocumentRequest(file, 'material-id-1', 'document-type-id-1');

    expect(first.courtDocument.courtDocumentId).not.toBe(second.courtDocument.courtDocumentId);
  });
});

describe('findDocumentTypeId', () => {
  it('returns the id of the document type access entry whose documentCategory is Applications', () => {
    const documentsTypeAccess = [
      { id: 'case-level-id', documentCategory: 'Case level' },
      { id: 'document-type-id-1', documentCategory: 'Applications' }
    ];

    expect(findDocumentTypeId(documentsTypeAccess)).toBe('document-type-id-1');
  });

  it('returns an empty string when no entry matches', () => {
    const documentsTypeAccess = [{ id: 'case-level-id', documentCategory: 'Case level' }];

    expect(findDocumentTypeId(documentsTypeAccess)).toBe('');
  });
});
