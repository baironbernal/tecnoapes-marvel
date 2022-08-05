import { createReducer, on } from '@ngrx/store';
import { Comic } from '../models/comic.model';
import { setItems, unSetItems } from './comic.actions';

export interface State {
    items: any; 
}

export const initialState: State = {
   items: [],
}

const _comicReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items]})),
    on(unSetItems, state => ({ ...state, items: []})),

    

);

export function comicReducer(state, action) {
    return _comicReducer(state, action);
}