import { createAction, props } from '@ngrx/store';
import { NonStandardProsecutor, ProsecutorType } from '../model';
import { Prosecutor } from '@cpp/reference-data';

export const createProsecutor = createAction(
  'CREATE_PROSECUTOR',
  props<{ prosecutor: NonStandardProsecutor; prosecutorType: ProsecutorType }>()
);

export const createProsecutorSuccess = createAction(
  'CREATE_PROSECUTOR_SUCCESS',
  props<{
    prosecutor: Prosecutor;
    prosecutorType: ProsecutorType;
  }>()
);

export const saveProsecutor = createAction(
  'SAVE_PROSECUTOR',
  props<{
    prosecutor: NonStandardProsecutor;
  }>()
);
