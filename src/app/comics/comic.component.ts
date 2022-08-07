import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { ComicService } from '../services/comic.service';
import { AppState } from '../app.reducer';

import { Subscription, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-heroes',
  templateUrl: './comic.component.html',
  styles: []
})
export class ComicComponent implements OnInit, OnDestroy {
  
  
  comicsArr: any[];
  search = new FormControl('');
  loading: boolean = false; 
  uiSuscription: Subscription;
  comicSuscritption: Subscription;
  comicRedxSus: Subscription;

  constructor(private comicService: ComicService, 
    private store: Store<AppState>,private router: Router) { 
      
    }

  ngOnInit(): void {

    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(search => this.searchComic(search)),
      
    ).subscribe()
    
    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.comicSuscritption = this.comicService.allComics();
    this.suscribeRdxToComics();
  }
  

  suscribeRdxToComics() {
    this.comicRedxSus = this.store.select('comic').subscribe(({items}) => {
      this.comicsArr = items
    })
    
    
  }

  searchComic(valueToSearch: string) {
    if (valueToSearch === null && valueToSearch === undefined) {
      this.suscribeRdxToComics();
    }
    return this.comicsArr = this.comicsArr.filter(
      items => items.title.includes(valueToSearch)
    ) 
    
  }
  
  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe()
    this.comicSuscritption.unsubscribe()
    this.comicRedxSus.unsubscribe()
  }

  addFavorites(idApi: number) {
    if(this.comicService.addFav(idApi)){
      Swal.fire('Agregado a favoritos', 'sucesss', 'success')
      this.router.navigate(['/favs'])
    }
    else{

    }
    
  }

}
