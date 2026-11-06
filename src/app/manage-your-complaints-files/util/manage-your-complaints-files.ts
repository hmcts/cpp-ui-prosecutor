import { v4 as uuid } from 'uuid';
import { HttpErrorResponse } from '@angular/common/http';
import { DocumentTypeAccess } from '../../contexts/reference-data/reference-data.interface';
import { AddCourtDocumentRequest, APPLICATION_DOCUMENT_CATEGORY } from '../interface/manage-your-complaints-files';

export const findDocumentTypeId = (documentsTypeAccess: DocumentTypeAccess[]): string =>
  documentsTypeAccess.find(({ documentCategory }) => documentCategory === APPLICATION_DOCUMENT_CATEGORY)?.id ?? '';

export const parseApiErrorMessage = (error: HttpErrorResponse): string =>
  (typeof error.error === 'string' ? JSON.parse(error.error) : error.error).error;

export const buildAddCourtDocumentRequest = (
  file: File,
  materialId: string,
  documentTypeId: string,
  summonsApplicationId: string
): AddCourtDocumentRequest => ({
  courtDocument: {
    courtDocumentId: uuid(),
    documentCategory: {
      applicationDocument: {
        applicationId: summonsApplicationId
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
