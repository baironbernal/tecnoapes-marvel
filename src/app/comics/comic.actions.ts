import { createAction, props } from '@ngrx/store';

export const setItems = createAction(
            '[Set items comics] setItems',
            props<{ items: any }>()
      );
export const unSetItems = createAction('[UNSet items comics] UnSet Items');