import { Action } from '@ngrx/store';
import { RequestOptions } from '../services/http';

export const enum ApiActionTypes {
  API_REQUEST = '[atcm] Pending api request',
  API_RESPONSE = '[atcm] Completed api request',
  API_ERROR = '[atcm] Api error'
}

export class ApiError implements Action {
  readonly type = ApiActionTypes.API_ERROR;

  constructor(public readonly response: any) {}
}

export class PendingApiRequest implements Action {
  readonly type = ApiActionTypes.API_REQUEST;

  constructor(public readonly request: RequestOptions) {}
}

export class CompletedApiRequest implements Action {
  readonly type = ApiActionTypes.API_RESPONSE;

  constructor(public readonly request: RequestOptions) {}
}

export type ApiAction = CompletedApiRequest | PendingApiRequest | ApiError;
