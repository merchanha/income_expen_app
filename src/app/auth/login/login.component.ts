import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; 

  constructor(private fb: FormBuilder, private authServices: AuthService, private routes: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
    
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]



    })


  }

  ingresar(){

    if (this.loginForm.invalid){return}

    Swal.fire({
      title: 'Espere por favor!', 
      didOpen: () => {
        Swal.showLoading()
       
      }
     
    });







    const{email, password}= this.loginForm.value;
    this.authServices.ingresar(email, password)
    .then( credenciales =>{
      console.log(credenciales);
      Swal.close();
      this.routes.navigate(['/'])

    })
    .catch(error => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
      
    }))




  }

}
