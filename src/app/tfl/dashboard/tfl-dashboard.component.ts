import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PleadedNotGuiltyCaseResult } from '../../contexts/sjp';

@Component({
  selector: 'tfl-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">
        <span pdk-typography="caption-xlarge">Prosecutor</span>
        Single Justice Procedure
      </h1>
      <h2 pdk-typography="heading-medium" pdk-margin-top="8">Search for a case</h2>
      <search-input-container></search-input-container>
    </pdk-grid>
    <pdk-grid container>
      <pdk-grid two-thirds>
        <h2 pdk-typography="heading-medium" pdk-margin-top="8">Send data files to court</h2>
        <div>
          <a href="javascript: void(0)" routerLink="csv-upload" pdk-link>
            Upload header and offence CSVs
          </a>
        </div>
        <div pdk-margin-top="6">
          <a href="javascript: void(0)" routerLink="check-csv-uploads" pdk-link>
            Check CSV uploads
          </a>
        </div>

        <h2 pdk-typography="heading-medium" pdk-margin-top="8">Send SJP notices and other documents</h2>
        <div>
          <a href="javascript: void(0)" routerLink="upload-documents" pdk-link>
            Upload SJP notices, previous convictions and witness statements
          </a>
        </div>
        <div pdk-margin-top="6">
          <a href="javascript: void(0)" routerLink="check-document-uploads" pdk-link>
            Check document uploads
          </a>
        </div>

        <h2 pdk-typography="heading-medium" pdk-margin-top="8">Other tasks</h2>

        <review-not-guilty-pleas-link [numberOfCases]="pleadedNotGuiltyCasesDetail?.count">
        </review-not-guilty-pleas-link>

        <p pdk-typography="caption-medium">Defendant details updates (0)</p>
        <div>
          <a href="" pdk-link pdk-section="small">Withdraw an offence</a>
        </div>
        <div pdk-margin-top="6">
          <a href="" pdk-link>Export case results by date</a>
        </div>
      </pdk-grid>
      <pdk-grid one-third>
        <a href="javascript: void(0);" routerLink="check-csv-uploads" title="CSV errors in last upload">
          <pdk-summary-item pdk-text-colour="blue" hero [count]="csvUploadErrorCount" label="CSV errors in last upload">
          </pdk-summary-item>
        </a>
        <a href="javascript: void(0);" routerLink="check-document-uploads">
          <pdk-summary-item
            pdk-text-colour="blue"
            hero
            [count]="documentsUploadErrorCount"
            label="document errors in last upload"
          >
          </pdk-summary-item>
        </a>
        <a href="javascript: void(0);" routerLink="cases-missing-sjp-notices" title="Cases missing SJP notices">
          <pdk-summary-item
            pdk-text-colour="blue"
            hero
            [count]="casesMissingSjpNoticeCount"
            label="cases missing SJP notices"
          >
          </pdk-summary-item>
        </a>
      </pdk-grid>
    </pdk-grid>
  `
})
export class TflDashboardComponent {
  @Input() pleadedNotGuiltyCasesDetail: PleadedNotGuiltyCaseResult;
  @Input() casesMissingSjpNoticeCount: number;
  @Input() documentsUploadErrorCount: number;
  @Input() csvUploadErrorCount: number;
}
