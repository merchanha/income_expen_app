import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions'
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresoEgrSubs: Subscription

  constructor(private store: Store<AppState>, 
    private ingresoEgresoServices: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe()
    this.ingresoEgrSubs?.unsubscribe()
      
  }



  ngOnInit(): void {

    this.userSubs=this.store.select('user')
    .pipe(
      filter(auth=> auth.user != null)
    )
    .subscribe(user=>{
      this.ingresoEgrSubs =this.ingresoEgresoServices.initIngresosEgresosListener(user.user.uid).subscribe(ingresosEgresosfb =>{
        this.store.dispatch(ingresosEgresosActions.setIntems({items: ingresosEgresosfb }))
      })
    })
  }

}
