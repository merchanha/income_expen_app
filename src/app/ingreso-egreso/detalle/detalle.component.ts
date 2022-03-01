import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',

})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgreso: IngresoEgreso[] = []
  ingresosSubs : Subscription

  constructor(private store: Store<AppStateWithIngreso>,
    private ingresoEgresoServices: IngresoEgresoService ) { }

  ngOnInit(): void {
    this.ingresosSubs=this.store.select('ingresosEgresos')
    .subscribe ((ingresoEgresos)=>
      this.ingresoEgreso  = ingresoEgresos.items
    )
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe()
      
  }

  borrar(uid: string){
    this.ingresoEgresoServices.borrarIngresoEgreso(uid)
    .then ( ()=>
      Swal.fire('Borrado', 'Item borrado', 'success' )
    )
    .catch(
      error => Swal.fire('Error', error.message, 'error' )
    );
    
    

  }


}
