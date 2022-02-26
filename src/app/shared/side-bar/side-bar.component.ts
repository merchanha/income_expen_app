import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
 
})
export class SideBarComponent implements OnInit {

  constructor(private authServices: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authServices.logout().then(()=>{
      this.router.navigate(['/login'])

    })
    



  }

}
