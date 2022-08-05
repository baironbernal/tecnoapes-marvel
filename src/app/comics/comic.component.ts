import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { ComicService } from '../services/comic.service';
import { AppState } from '../app.reducer';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './comic.component.html',
  styles: []
})
export class ComicComponent implements OnInit, OnDestroy {
  
  comicsArr: any[];
  loading: boolean = false; 
  uiSuscription: Subscription;
  comicSuscritption: Subscription;
  comicRedxSus: Subscription;

  constructor(private comicService: ComicService, private store: Store<AppState>) { }

  ngOnInit(): void {
    
    
    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);

    this.comicSuscritption = this.comicService.allComics();

    this.comicRedxSus = this.store.select('comic').subscribe(({items}) => this.comicsArr = items)
      
  
  }
  
  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe()
    this.comicSuscritption.unsubscribe()
    this.comicRedxSus.unsubscribe()
  }

  save() {

    // if(this.incomeForm.invalid) {return;}

    // this.store.dispatch(isLoading())

    // const { description, amount }  = this.incomeForm.value;

    // const incomeEgress = new Comic(description, amount, this.type)
    
    // this.ieService.create(incomeEgress)
    //           .then( ()  => { 
    //             this.store.dispatch(stopLoading())
    //               Swal.fire('Registro creado', description, 'success')
    //            })
    //           .catch( err => Swal.fire('Error', err.message, 'error') )
  }

}
