import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { unSetItems } from 'src/app/comics/comic.actions';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit , OnDestroy {

  sideBarSubs: Subscription;
  profile: any;

  constructor(private router: Router,
              private auth: AuthService,
              private store: Store<AppState>
              ) { }

  ngOnInit(): void {
      this.sideBarSubs = this.store.select('auth')
        .pipe(filter(auth => auth != null))    
        .subscribe(({ user }) => this.profile = user);

  }

  logOut() {
    this.auth.logOut()
        .then(() => this.router.navigate(['/login']))
        .catch(err => err)
    
    this.store.dispatch(unSetItems())
    
  }
  
  ngOnDestroy(): void {
    this.sideBarSubs.unsubscribe()
  }

}
