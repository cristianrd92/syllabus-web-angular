import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from "sweetalert2";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private authService:AuthService, private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e =>{
        if(e.status==401){
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login'])
        }
        if(e.status==403){
          swal("Acceso denegado", "No tienes acceso a este recurso!", "warning");
          this.router.navigate(['/']);
        }
        if(e.status==500){
          console.log(e.error)
          console.log(e.mensaje)

          swal(e.error.mensaje, e.error.error, "error");
        }
        return throwError(e);
      })
    );
  }
}