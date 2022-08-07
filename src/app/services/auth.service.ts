import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;


  get user() {
    return { ... this._user  }
  }
  constructor(
            private firestore: AngularFirestore,
              public auth: AngularFireAuth,
              public store: Store<AppState>,
  ) { }
  
  initAuthListener() {
    this.auth.authState.subscribe( fireUser => {
        
      if (fireUser) {
        this.userSubscription =  this.firestore.doc(fireUser.uid + '/usuario').valueChanges()
              .subscribe((fireStoreUser: any) => {
                const user = User.fromFireBase(fireStoreUser);
                this._user = user;
                this.store.dispatch(setUser({user}))

              })

      } else {
        this._user = null;
        if(this.userSubscription) {this.userSubscription.unsubscribe()}
        this.store.dispatch(unSetUser())

        
      }
    })
  }

  createUser(nombre: string, email:string, password: string) {
      return this.auth.createUserWithEmailAndPassword(email,password)
              .then(({ user }) => {
                const newUser = new User(user.uid, nombre, user.email);
                this.firestore.doc(user.uid + '/usuario').set({...newUser})
              })
              .catch(err => err)
  }

  loginUser(email:string, password: string) {
      return this.auth.signInWithEmailAndPassword(email,password)
  }

  logOut() {
    return this.auth.signOut()    
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}
