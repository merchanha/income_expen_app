import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as action from '../shared/ui.actions'
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
 
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  cargando: boolean= false;
  tipo: string= 'ingreso'
  subscription : Subscription;

  constructor(private fb: FormBuilder,
    private ingresoEgresoServices: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required, Validators.pattern[1-9]],

    })

    this.subscription = this.store.select('ui')
    .subscribe(ui=>{
      this.cargando = ui.isLoading;

    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
      
  }


  guardar(){

    if (this.ingresoForm.invalid) {return}
    this.store.dispatch(action.isLoading())
    console.log(this.ingresoForm.value)
    console.log(this.tipo)

    const {descripcion, monto}= this.ingresoForm.value

    const ingresoEgreso= new IngresoEgreso(descripcion, monto, this.tipo)

    this.ingresoEgresoServices.crearIngresoEgreso(ingresoEgreso)
    .then(()=>{
      this.ingresoForm.reset();
      this.store.dispatch(action.stopLoading())
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch(err=> {
      this.store.dispatch(action.stopLoading())
      Swal.fire('Error', err.message, 'error');

    })
     
  }}
