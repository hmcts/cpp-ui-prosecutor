import { ProsecutorCaseDataBuilder } from './prosecutor-case-data-builder';
import { CaseData } from '../interfaces';
import * as _ from 'lodash';
import { SYSTEM_TVL_USER } from '../../tools/utils';
import { CaseDataBuilder } from './case-data-builder';

export class TvlCaseDataBuilder extends ProsecutorCaseDataBuilder {

    public static readonly ProsecutorAuthority = 'GAEAA01';

    constructor(protected data: CaseData) {
        super(data, SYSTEM_TVL_USER);
    }

    static createCaseData(urn = null, postedDaysAgo = 28): TvlCaseDataBuilder {
        const dataBuilder = new TvlCaseDataBuilder(CaseDataBuilder.createCaseDataPayload());
        dataBuilder.setupBaseCaseData(urn, postedDaysAgo, 'TVL');
        return dataBuilder;
    }

    static createCaseDataForMultipleOffences(urn: string = null,
                                             postedDaysAgo: number = 28, numberOfOffences: number = 2): TvlCaseDataBuilder {
        const dataBuilder = new TvlCaseDataBuilder(CaseDataBuilder.createCaseDataPayload());
        dataBuilder.setupBaseCaseData(urn, postedDaysAgo, 'TVL', numberOfOffences);
        return dataBuilder;
    }
}
