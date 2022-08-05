import *  as uiActions  from 'src/app/shared/ui.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  uiSuscription: Subscription;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService ,
              private router: Router,
              private store: Store<AppState>

    ) {this.registerForm = this.fb.group({})}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }


  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe()
  }

  createUser() {
    if (this.registerForm.invalid) {return;}
  
    this.store.dispatch(uiActions.isLoading());

    const { nombre,  correo, password} = this.registerForm.value;
    this.authService.createUser(nombre, correo, password)
        .then(credentials => {
          this.store.dispatch(uiActions.stopLoading())
          this.router.navigate(['/'])
          
        })
        .catch( err =>  Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Datos incorrectos',
            })
        )}
}
