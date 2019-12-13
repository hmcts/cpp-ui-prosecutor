import { Component } from '@angular/core';

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
            <h1 pdk-page-title pdk-text bold compound>
                {{ 'atcm.accessibility.title' | translate }}
                <a id="a11y-statement"></a>
            </h1>
            <p pdk-text>{{ 'atcm.accessibility.statement.paragraph1' | translate }}</p>
            <ul class="list list-bullet">
                <li pdk-text>{{'atcm.accessibility.statement.bullets.font_size' | translate }}</li>
                <li pdk-text>{{'atcm.accessibility.statement.bullets.zoom_up' | translate }}</li>
                <li pdk-text>{{'atcm.accessibility.statement.bullets.navigate_keyboard' | translate }}</li>
                <li pdk-text>{{'atcm.accessibility.statement.bullets.navigate_speech' | translate }}</li>
                <li pdk-text>{{'atcm.accessibility.statement.bullets.listen_screen_reader' | translate }}</li>
            </ul>
            <p pdk-text>{{'atcm.accessibility.statement.paragraph2' | translate }}</p>
            <p pdk-text>
                <a href="https://mcmw.abilitynet.org.uk/"
                   target="_blank">AbilityNet ({{'atcm.accessibility.opens_new_window' | translate }})</a>
                {{'atcm.accessibility.statement.paragraph3' | translate }}
            </p>

            <h2 class="heading-medium" bold compound>
                {{'atcm.accessibility.what_to_do.title' | translate }}
                <a id="a11y-what-to-do"></a>
            </h2>
            <p pdk-text>
                {{ 'atcm.accessibility.what_to_do.paragraph1' | translate }}
            </p>
            <p pdk-text>
                &#8226; {{'atcm.accessibility.what_to_do.email' | translate}}
                <a href="mailto:cjscp-pmo@hmcts.net" target="_blank">cjscp-pmo@hmcts.net</a>
            </p>
            <p pdk-text>
                {{'atcm.accessibility.what_to_do.paragraph1b' | translate }}
            </p>

            <h2 class="heading-medium" bold compound>
                {{'atcm.accessibility.enforcement.title' | translate }}
                <a id="a11y-enforcement-procedure"></a>
            </h2>
            <p pdk-text>
                {{'atcm.accessibility.enforcement.paragraph1' | translate }}
                <a href="https://www.equalityadvisoryservice.com/" target="_blank">
                    {{'atcm.accessibility.enforcement.link' | translate }} ({{'atcm.accessibility.opens_new_window' | translate }})
                </a>
            </p>

            <h2 class="heading-medium" bold compound>
                {{'atcm.accessibility.technical.title' | translate }}
                <a id="a11y-technical-information"></a>
            </h2>
            <p pdk-text>{{'atcm.accessibility.technical.paragraph1' | translate }}</p>
            <p pdk-text>{{'atcm.accessibility.technical.paragraph2' | translate }}</p>

            <h2 class="heading-medium" bold compound>
                {{'atcm.accessibility.what-were-doing.title' | translate }}
                <a id="a11y-what-we-re-doing"></a>
            </h2>
            <p pdk-text>{{'atcm.accessibility.what-were-doing.paragraph1' | translate }}</p>
            <p pdk-text>{{'atcm.accessibility.what-were-doing.paragraph2' | translate }}</p>
            <p pdk-text>{{'atcm.accessibility.what-were-doing.paragraph3' | translate }}</p>
            <p pdk-text>{{'atcm.accessibility.what-were-doing.paragraph4' | translate }}</p>
        </pdk-grid>
    </pdk-grid>`
})
export class AccessibilityComponent {
    constructor() {
    }
}
