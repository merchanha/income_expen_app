import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authServices: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]



    })
  }

  crearUsuario(){
  

    if (this.registerForm.invalid){return}

    Swal.fire({
      title: 'Espere por favor!', 
      didOpen: () => {
        Swal.showLoading()
       
      }
     
    });


    const{nombre, email, password}= this.registerForm.value;
    this.authServices.crearUsuario(nombre, email, password)
    .then( credenciales =>{
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/'])

    })
    .catch(error => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
      
    }))


  }

}
