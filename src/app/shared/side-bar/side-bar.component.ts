import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
 
})
export class SideBarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  nombreSubs : Subscription

  constructor(private authServices: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.nombreSubs=this.store.select('user')
    .subscribe((user)=>{
      this.nombre = user.user?.nombre

    })

  }

  ngOnDestroy(): void {
      this.nombreSubs.unsubscribe()
  }

  logOut(){
    this.authServices.logout().then(()=>{
      this.router.navigate(['/login'])

    })
    



  }

}
