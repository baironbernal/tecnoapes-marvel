import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comic } from '../models/comic.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setItems } from '../comics/comic.actions';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  URL: string;

  constructor(private firestore: AngularFirestore, private authService: AuthService,
               private http: HttpClient, private store: Store<AppState>) { 

     this.URL = 'http://gateway.marvel.com/v1/public/series?ts=1&apikey=b5dd158dd0e856443db7fb726fbc6bc9&hash=80182fcb24c6426319114b9e34eafed6';
  }

  addFavorites(comics: Comic) {
    return this.firestore.doc(this.authService.user.uid + '/comics')
                  .collection('favs')
                  .add( {...comics} )
  }


  allComics():any {
    return this.http.get(this.URL).subscribe(
      (data) => {
        if(!data) { return; }
        console.log(data['data']['results'])
        this.store.dispatch(setItems({ items: data['data']['results'] }))
      }
    )
  }

  
}
