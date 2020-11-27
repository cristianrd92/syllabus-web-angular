import { Injectable } from '@angular/core';

import { Comision } from './comision';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global.component';
import { Usuario } from 'src/app/usuarios/usuario';


@Injectable()
export class ComisionCarreraService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/usuariocomision';
  constructor(private http: HttpClient, private router: Router) { }

  create(carrera: Comision) : Observable<Comision> {
    return this.http.post(this.urlEndPoint, carrera).pipe(
      map((response:any) => response.carrera as Comision),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getComisiones(id): Observable<Comision[]> {
    return this.http.get<Comision[]>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/carreras']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getUsuarios(id): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlEndPoint}/listado/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/carreras']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Comision> {
    return this.http.delete<Comision>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
