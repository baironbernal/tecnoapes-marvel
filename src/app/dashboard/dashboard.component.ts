import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { ComicService } from '../services/comic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  URL: string;
  userSubs: Subscription;
  infoSubs: Subscription;

  constructor(private store: Store<AppState>, private comicService: ComicService) { }

  ngOnInit(): void {
    
    this.userSubs =  this.store.select('auth')
        .pipe(filter(auth => auth.user != null)).subscribe()

  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.infoSubs.unsubscribe();

  }

}
