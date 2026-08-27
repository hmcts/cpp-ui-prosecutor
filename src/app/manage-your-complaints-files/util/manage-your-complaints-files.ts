import { v4 as uuid } from 'uuid';
import { DocumentTypeAccess } from '../../contexts/reference-data/reference-data.interface';
import { AddCourtDocumentRequest, APPLICATION_DOCUMENT_CATEGORY } from '../interface/manage-your-complaints-files';

// TODO: backend to confirm the real applicationId - hardcoded for the time being
const APPLICATION_ID = '4cf684b8-ae91-405c-96a1-adebad1d5411';

export const findDocumentTypeId = (documentsTypeAccess: DocumentTypeAccess[]): string =>
  documentsTypeAccess.find(({ documentCategory }) => documentCategory === APPLICATION_DOCUMENT_CATEGORY)?.id ?? '';

export const buildAddCourtDocumentRequest = (
  file: File,
  materialId: string,
  documentTypeId: string
): AddCourtDocumentRequest => ({
  courtDocument: {
    courtDocumentId: uuid(),
    documentCategory: {
      applicationDocument: {
        applicationId: APPLICATION_ID
      }
    },
    name: file.name,
    documentTypeId,
    documentTypeDescription: APPLICATION_DOCUMENT_CATEGORY,
    mimeType: file.type,
    containsFinancialMeans: false,
    sendToCps: false,
    materials: [
      {
        id: materialId,
        receivedDateTime: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
      }
    ]
  }
});
