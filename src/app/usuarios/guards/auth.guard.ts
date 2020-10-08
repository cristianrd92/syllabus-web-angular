import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice:AuthService,
    private router: Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      if(this.authservice.isAuthenticated()){
        if(this.isTokenExpirado()){
          this.authservice.logout();
          this.router.navigate(["/login"]);
          return false;
        }
        return true;
      }
    this.router.navigate(["/login"]);
    return false;
  }
  isTokenExpirado():boolean{
    let token = this.authservice.token;
    let payload = this.authservice.obtenerDatosToken(token);
    let now = new Date().getTime()/1000;
    if(payload.exp<now){
      return true;
    }
    return false;
  }
}
