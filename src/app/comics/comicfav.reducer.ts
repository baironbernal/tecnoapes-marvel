import { createReducer, on } from '@ngrx/store';
import { setComicsFavs, unSetComicsFavs } from './comic.actions';

export interface State {
    items: any; 
}

export const initialState: State = {
   items: [],
}

const _comicFavReducer = createReducer(initialState,

  

    on(setComicsFavs, (state, { items }) => ({ ...state, items: [...state.items, ...items]})),
    on(unSetComicsFavs, state => ({ ...state, items: []})),
);

export function comicFavReducer(state, action) {
    return _comicFavReducer(state, action);
}