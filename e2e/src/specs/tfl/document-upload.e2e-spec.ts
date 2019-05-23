import { TFL_USER } from '../../../../tools/utils';
import { isStable, navigate } from '../../util';
import { UploadDocumentsPage } from '../../pages/tfl/upload-documents.page';
import { CheckDocumentUploadPage } from '../../pages/tfl/check-document-upload.page';
import { ViewDocumentUploadReportPage } from '../../pages/tfl/view-document-upload-report.page';
import { ZipGenerator } from '../../../../tools/helpers/zip-generator';
import { getFileUploadStats } from '../../../../tools/contexts/staging';
import { fetch } from '@cpp/ui.priming';
import { TflCaseDataBuilder } from '../../../../tools/helpers';
import { TflDashboardPage } from '../../pages/tfl/dashboard.page';

describe('tfl prosecutor', () => {
  const page = new UploadDocumentsPage();
  const tflDashboardPage = new TflDashboardPage();
  const checkDocumentUploadPage = new CheckDocumentUploadPage();

  const zipGenerator = new ZipGenerator();

  beforeEach(async () => await navigate(page.getUrl(), TFL_USER));
  const stagingParamForTflCaseData = TflCaseDataBuilder.createCaseDataForTfl().buildStagingParam();
  const stagingParamForInvalidTflCaseData = TflCaseDataBuilder.createInvalidTflCaseData().buildStagingParam();
  const zipFile = zipGenerator.generateZipFile(stagingParamForInvalidTflCaseData);

  it('should be able to upload the zip docs', async () => {
    await page.submitForm(zipGenerator.generateZipFile(stagingParamForTflCaseData));
    await expect(page.successAlert.getText()).toContain('Your zip file is being checked for errors');
  });

  it('should check document upload error count and check the error report', async () => {
    await fetch(() => getFileUploadStats(TFL_USER), ({ documentsUpload }) => documentsUpload.errorCount === 0);

    const uploadStatResult = await getFileUploadStats(TFL_USER);

    await navigate(tflDashboardPage.getUrl(), TFL_USER);
    await expect(tflDashboardPage.documentUploadErrorLink.getText()).toContain('0');

    await tflDashboardPage.documentUploadErrorLink.click();
    await isStable();

    await expect(checkDocumentUploadPage.heading.getText()).toContain('Check document uploads');

    const fileParts = zipFile.split('/');
    const fileName = fileParts[fileParts.length - 1];

    await expect(checkDocumentUploadPage.getRow(1).fileName.getText()).toContain(fileName);

    await expect(checkDocumentUploadPage.getRow(1).status.getText()).toContain('Rejected – errors found');

    await checkDocumentUploadPage.getRow(1).viewReport.click();
    await isStable();

    const viewDocumentUploadPage = new ViewDocumentUploadReportPage(uploadStatResult.documentsUpload.uploadId);

    await expect(viewDocumentUploadPage.heading.getText()).toContain('View upload report');

    await expect(viewDocumentUploadPage.fileName.getText()).toContain(fileName);

    await expect(viewDocumentUploadPage.errorStatus.getText()).toContain('Rejected – errors found');
  });
});
