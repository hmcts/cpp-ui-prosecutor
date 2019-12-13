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

describe('TFL Prosecutor', () => {
  describe('Document upload', () => {
    const page = new UploadDocumentsPage();
    const tflDashboardPage = new TflDashboardPage();
    const checkDocumentUploadPage = new CheckDocumentUploadPage();

    const zipGenerator = new ZipGenerator();

    beforeEach(async () => await navigate(page.getUrl(), TFL_USER));
    const stagingParamForTflCaseData = TflCaseDataBuilder.createCaseDataForTfl().buildStagingParam();
    const stagingParamForInvalidTflCaseData = TflCaseDataBuilder.createInvalidTflCaseData().buildStagingParam();
    const zipFile = zipGenerator.generateZipFile(stagingParamForInvalidTflCaseData);

    it('should be able to upload case documents in zip file', async () => {
      await page.submitForm(zipGenerator.generateZipFile(stagingParamForTflCaseData));
      expect(await page.successAlert.getText()).toContain('Your zip file is being checked for errors');
    });

    it('should check zip file error count and error report', async () => {
      await fetch(() => getFileUploadStats(TFL_USER), ({ documentsUpload }) => documentsUpload.errorCount === 0);

      const uploadStatResult = await getFileUploadStats(TFL_USER);

      await navigate(tflDashboardPage.getUrl(), TFL_USER);
      expect(await tflDashboardPage.documentUploadErrorLink.getText()).toContain('0');

      await tflDashboardPage.documentUploadErrorLink.click();
      await isStable();

      expect(await checkDocumentUploadPage.heading.getText()).toContain('Check document uploads');

      const fileParts = zipFile.split('/');
      const fileName = fileParts[fileParts.length - 1];

      expect(await checkDocumentUploadPage.getRow(1).fileName.getText()).toContain(fileName);

      expect(await checkDocumentUploadPage.getRow(1).status.getText()).toContain('Rejected – errors found');

      await checkDocumentUploadPage.getRow(1).viewReport.click();
      await isStable();

      const viewDocumentUploadPage = new ViewDocumentUploadReportPage(uploadStatResult.documentsUpload.uploadId);

      expect(await viewDocumentUploadPage.heading.getText()).toContain('View upload report');

      expect(await viewDocumentUploadPage.fileName.getText()).toContain(fileName);

      expect(await viewDocumentUploadPage.errorStatus.getText()).toContain('Rejected – errors found');
    });
  });
});
