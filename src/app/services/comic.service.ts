import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comic } from '../models/comic.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setItems, setComicsFavs } from '../comics/comic.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class ComicService {
  domain: string;
  URL: string;
  apikey: string;
  hash: string;

  constructor(private firestore: AngularFirestore, private authService: AuthService,
               private http: HttpClient, private store: Store<AppState>) { 
    
      this.domain = 'http://gateway.marvel.com/v1/public/';
      this.apikey = 'b5dd158dd0e856443db7fb726fbc6bc9';
      this.hash = '80182fcb24c6426319114b9e34eafed6';
      this.URL = this.domain + 'comics?ts=1&apikey='+ this.apikey +'&hash=' + this.hash;
  }

  addFav(idApi: number) {
    
   return this.http.get(this.domain + 'comics/'+idApi+'?ts=1&apikey='+ this.apikey +'&hash=' + this.hash).subscribe(
      (data) => {
        if(!data) { return; }
        
        const dataArr = data['data']['results'];
        this.store.dispatch(setComicsFavs({ items: dataArr }))
        return this.firestore.doc(this.authService.user.uid + '/comics')
        .collection('favs')
        .add({ items: dataArr} )
      }
    )   
  }

  allFavs() {
    return this.firestore.collection(this.authService.user.uid   + '/comics/favs')
    .snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map(doc => {
          return {
            data: doc.payload.doc.data()
          }
        });
      })
    );
  }



  allComics():any {
    return this.http.get(this.URL).subscribe(
      (data) => {
        if(!data) { return; }
        this.store.dispatch(setItems({ items: data['data']['results'] }))
      }
    )
  }

  
}
