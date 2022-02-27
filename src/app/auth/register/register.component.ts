import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions'
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit,  OnDestroy {


  registerForm: FormGroup;
  cargando: boolean = false
  uiSubscription : Subscription;

  constructor(private fb: FormBuilder, 
    private authServices: AuthService,
    private router: Router,
    private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]

      



    })

    this.uiSubscription=this.store.select('ui').subscribe(ui=>{
      this.cargando = ui.isLoading;
      console.log('cargando subs register')

    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
      
  }

  crearUsuario(){
  

    if (this.registerForm.invalid){return}
    this.store.dispatch(ui.isLoading())
   

    

    // Swal.fire({
    //   title: 'Espere por favor!', 
    //   didOpen: () => {
    //     Swal.showLoading()
       
    //   }
     
    // });


    const{nombre, email, password}= this.registerForm.value;
    this.authServices.crearUsuario(nombre, email, password)
    .then( credenciales =>{
      console.log(credenciales);
      // Swal.close();
      this.store.dispatch(ui.stopLoading())
      this.router.navigate(['/'])

    })
    .catch(error =>{
      this.store.dispatch(ui.stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        
      })

    }) 


  }

}
