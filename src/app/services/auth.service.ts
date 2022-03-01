import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription : Subscription;
  private _user: Usuario;

  get user() {
    return this._user;
  }

  constructor( public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      // console.log(fuser)
         if (fuser){

       this.userSubscription= this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser: any) =>{
          const user = Usuario.fromFireBase(firestoreUser);
          this._user = user
          this.store.dispatch(authActions.setUser({user}))
    
          

        })

      }else{
        this._user = null
        this.userSubscription.unsubscribe()
        this.store.dispatch(authActions.unSetUser())
        this.store.dispatch(ingresoEgresoActions.unSetIntems())
       
      }
  
    })

  }

  crearUsuario(nombre: string, email: string, password: string){
    
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) =>{
      const newUser = new Usuario(user.uid, nombre, user.email)
     return this.firestore.doc(`${user.uid}/usuario`).set({...newUser})
    })
    
  }

  ingresar(email: string, password: string){

    return this.auth.signInWithEmailAndPassword(email, password)

  }

  logout(){
    return this.auth.signOut()
    
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }





}
