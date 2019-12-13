import { TFL_USER } from '../../../../tools/utils';
import { isStable, navigate } from '../../util';
import { CsvUploadPage } from '../../pages/tfl/csv-upload.page';
import { CsvGenerator } from '../../../../tools/helpers/csv-generator';
import { getFileUploadStats } from '../../../../tools/contexts/staging';
import { fetch } from '@cpp/ui.priming';
import { TflCaseDataBuilder } from '../../../../tools/helpers';
import { TflDashboardPage } from '../../pages/tfl/dashboard.page';
import { CheckCsvPage } from '../../pages/tfl/check-csv.page';
import { ViewCsvUploadPage } from '../../pages/tfl/view-csv-upload.page';

describe('TFL Prosecutor', () => {
  describe('CSV upload', () => {
    const page = new CsvUploadPage();
    const tflDashboardPage = new TflDashboardPage();
    const checkCsvPage = new CheckCsvPage();

    const csvGenerator = new CsvGenerator();

    beforeEach(async () => await navigate(page.getUrl(), TFL_USER));

    it('should be able to upload case header and offence CSV documents', async () => {
      const stagingParam = TflCaseDataBuilder.createCaseDataForTfl().buildStagingParam();
      await page.submitForm(
        csvGenerator.generateHeaderFile(stagingParam),
        csvGenerator.generateOffenceFile(stagingParam)
      );

      expect(await page.successAlert.getText()).toContain('Your CSV file is being checked for errors');
    });

    it('should show errors if the file names are invalid', async () => {
      await page.submitForm(
        csvGenerator.generateInvalidFileNameFile('nppcase_tfl_000280_header.csv'),
        csvGenerator.generateInvalidFileNameFile('nppcase_tfl_000280_offences.csv')
      );

      expect(await page.errorMessages.get(0).getText()).toContain('Header file name format is wrong');
      expect(await page.errorMessages.get(1).getText()).toContain('Offence file name format is wrong');
    });

    it('should check upload error count and check the error report', async () => {
      const stagingParam = TflCaseDataBuilder.createInvalidTflCaseData().buildStagingParam();
      const headerFile = csvGenerator.generateHeaderFile(stagingParam);
      const offenceFile = csvGenerator.generateOffenceFile(stagingParam);
      await page.submitForm(headerFile, offenceFile);

      await fetch(() => getFileUploadStats(TFL_USER), ({ csvUpload }) => csvUpload.errorCount === 4);

      const uploadStatResult = await getFileUploadStats(TFL_USER);

      await navigate(tflDashboardPage.getUrl(), TFL_USER);
      // TODO: Server sporadically return count as 0. This should be investigated
      expect(await tflDashboardPage.csvUploadErrorLink.getText()).toContain('4');

      await tflDashboardPage.csvUploadErrorLink.click();
      await isStable();

      expect(await checkCsvPage.heading.getText()).toContain('Check CSV uploads');

      const fileParts = headerFile.split('/');
      const fileName = fileParts[fileParts.length - 1];

      expect(await checkCsvPage.getRow(1).fileName.getText()).toContain(fileName);

      expect(await checkCsvPage.getRow(1).status.getText()).toContain('Rejected – errors found');

      await checkCsvPage.getRow(1).viewReport.click();
      await isStable();

      const viewCsvUploadPage = new ViewCsvUploadPage(uploadStatResult.csvUpload.uploadId);

      expect(await viewCsvUploadPage.heading.getText()).toContain('View upload report');

      expect(await viewCsvUploadPage.fileName.getText()).toContain(fileName);

      expect(await viewCsvUploadPage.errorStatus.getText()).toContain('Rejected – errors found');

      expect(await viewCsvUploadPage.subHeading.get(0).getText()).toContain('Header - fix 1 error');

      expect(await viewCsvUploadPage.subHeading.get(1).getText()).toContain('Offences - fix 3 errors');
    });
  });
});
