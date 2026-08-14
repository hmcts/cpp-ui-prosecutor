import { Component } from '@angular/core';
import { PdkCore, PdkGridComponent, PdkLinkDirective } from "@cpp/pdk";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'atcm-accessibility',
    template: `<pdk-grid container>
        <pdk-grid one-third>
            <h1 class="heading-medium" style="margin-top: 60px">
                {{ 'atcm.accessibility.nav.title' | translate }}
            </h1>
            <ul class="list list-view">
                <li>
                    <a href="javascript:void(0)" pdk-link [routerLink]="['./']"
                       fragment="a11y-statement">
                        {{'atcm.accessibility.nav.statementLink' | translate }}
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" pdk-link [routerLink]="['./']"
                       fragment="a11y-what-to-do">
                        {{'atcm.accessibility.nav.whatToDoLink' | translate }}
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" pdk-link [routerLink]="['./']"
                       fragment="a11y-enforcement-procedure">
                        {{'atcm.accessibility.nav.enforcementProcedureLink' | translate }}
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" pdk-link [routerLink]="['./']"
                       fragment="a11y-technical-information">
                        {{'atcm.accessibility.nav.technicalInformationLink' | translate }}
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)" pdk-link [routerLink]="['./']"
                       fragment="a11y-what-we-re-doing">
                        {{'atcm.accessibility.nav.whatWereDoingLink' | translate }}
                    </a>
                </li>
            </ul>
        </pdk-grid>
        <pdk-grid two-thirds>
            <h1 pdk-typography="heading-large">
                {{ 'atcm.accessibility.title' | translate }}
                <a id="a11y-statement"></a>
            </h1>
            <p pdk-typography="body-medium">{{ 'atcm.accessibility.statement.paragraph1' | translate }}</p>
            <ul class="list list-bullet">
                <li pdk-typography="body-medium">{{'atcm.accessibility.statement.bullets.font_size' | translate }}</li>
                <li pdk-typography="body-medium">{{'atcm.accessibility.statement.bullets.zoom_up' | translate }}</li>
                <li pdk-typography="body-medium">{{'atcm.accessibility.statement.bullets.navigate_keyboard' | translate }}</li>
                <li pdk-typography="body-medium">{{'atcm.accessibility.statement.bullets.navigate_speech' | translate }}</li>
                <li pdk-typography="body-medium">{{'atcm.accessibility.statement.bullets.listen_screen_reader' | translate }}</li>
            </ul>
            <p pdk-typography="body-medium">{{'atcm.accessibility.statement.paragraph2' | translate }}</p>
            <p pdk-typography="body-medium">
                <a href="https://mcmw.abilitynet.org.uk/"
                   target="_blank">AbilityNet ({{'atcm.accessibility.opens_new_window' | translate }})</a>
                {{'atcm.accessibility.statement.paragraph3' | translate }}
            </p>

            <h2 pdk-typography="heading-medium">
                {{'atcm.accessibility.what_to_do.title' | translate }}
                <a id="a11y-what-to-do"></a>
            </h2>
            <p pdk-typography="body-medium">
                {{ 'atcm.accessibility.what_to_do.paragraph1' | translate }}
            </p>
            <p pdk-typography="body-medium">
                &#8226; {{'atcm.accessibility.what_to_do.email' | translate}}
                <a href="mailto:cjscp-pmo@hmcts.net" target="_blank">cjscp-pmo&#64;hmcts.net</a>
            </p>
            <p pdk-typography="body-medium">
                {{'atcm.accessibility.what_to_do.paragraph1b' | translate }}
            </p>

            <h2 pdk-typography="heading-medium">
                {{'atcm.accessibility.enforcement.title' | translate }}
                <a id="a11y-enforcement-procedure"></a>
            </h2>
            <p pdk-typography="body-medium">
                {{'atcm.accessibility.enforcement.paragraph1' | translate }}
                <a href="https://www.equalityadvisoryservice.com/" target="_blank">
                    {{'atcm.accessibility.enforcement.link' | translate }} ({{'atcm.accessibility.opens_new_window' | translate }})
                </a>
            </p>

            <h2 pdk-typography="heading-medium">
                {{'atcm.accessibility.technical.title' | translate }}
                <a id="a11y-technical-information"></a>
            </h2>
            <p pdk-typography="body-medium">{{'atcm.accessibility.technical.paragraph1' | translate }}</p>
            <p pdk-typography="body-medium">{{'atcm.accessibility.technical.paragraph2' | translate }}</p>

            <h2 pdk-typography="heading-medium">
                {{'atcm.accessibility.what-were-doing.title' | translate }}
                <a id="a11y-what-we-re-doing"></a>
            </h2>
            <p pdk-typography="body-medium">{{'atcm.accessibility.what-were-doing.paragraph1' | translate }}</p>
            <p pdk-typography="body-medium">{{'atcm.accessibility.what-were-doing.paragraph2' | translate }}</p>
            <p pdk-typography="body-medium">{{'atcm.accessibility.what-were-doing.paragraph3' | translate }}</p>
            <p pdk-typography="body-medium">{{'atcm.accessibility.what-were-doing.paragraph4' | translate }}</p>
        </pdk-grid>
    </pdk-grid>`,
    imports: [PdkGridComponent, TranslateModule, RouterLink, PdkCore, PdkLinkDirective]
})
export class AccessibilityComponent {
    constructor() {
    }
}
