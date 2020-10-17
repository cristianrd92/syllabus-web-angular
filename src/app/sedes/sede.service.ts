import { Injectable } from '@angular/core';

import { Sede } from './sede';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Ciudad } from '../ciudades/ciudad';
import { GlobalComponent } from '../global.component';


@Injectable()
export class SedeService {

  private urlEndPoint:string = GlobalComponent.apiURL+'sede';
  constructor(private http: HttpClient, private router: Router) { }

  getCiudades(): Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>(this.urlEndPoint + "/ciudades")
  }


  getSedes() : Observable<Sede[]> {
    return this.http.get<Sede[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let sedes = response as Sede[];
      return sedes.map(sede => {
        sede.nombre_sede = sede.nombre_sede.toUpperCase();
        return sede;
      });
    })
    );
  }

  create(sede: Sede) : Observable<Sede> {
    return this.http.post(this.urlEndPoint, sede).pipe(
      map((response:any) => response.sede as Sede),
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

  getSede(id): Observable<Sede> {
    return this.http.get<Sede>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/sedes']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(sede: Sede) : Observable<Sede> {
    return this.http.put<Sede>(`${this.urlEndPoint}/${sede.id}`, sede).pipe(
      map((response:any) => response.sede as Sede),
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

  delete(id: number): Observable<Sede> {
    return this.http.delete<Sede>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
