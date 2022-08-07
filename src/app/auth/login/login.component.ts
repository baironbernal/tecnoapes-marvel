import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as uiActions from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit , OnDestroy {
  

  loginForm: FormGroup;
  loading: boolean = false;
  uiSuscription: Subscription;

  constructor(private fb: FormBuilder,
            private authService: AuthService ,
            private router: Router ,
            private store: Store<AppState>

  ) {this.loginForm = this.fb.group({})}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['baironbernal263@gmail.com', [Validators.email, Validators.required]],
      password: ['123456', Validators.required]
    });

    this.uiSuscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading)

  }

  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe()
  }

  loginUser() {
    if (this.loginForm.invalid) {return;}

    this.store.dispatch(uiActions.isLoading());

    const {email, password} = this.loginForm.value;
    this.authService.loginUser(email, password)
        .then(success => {
          this.store.dispatch(uiActions.stopLoading())
          this.router.navigate(['/'])
        })
        .catch( err =>  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos incorrectos',
          })
        )
  }

}
