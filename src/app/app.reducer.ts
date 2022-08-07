import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as comic from './comics/comic.reducer';
import * as comicFav from './comics/comicfav.reducer';

export interface AppState {
   ui: ui.State,
   auth: auth.State,
   comic: comic.State,
   fav: comicFav.State,
}


export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer,
   comic: comic.comicReducer,
   fav: comicFav.comicFavReducer
}