import { Injectable } from '@angular/core';

import { Ramo } from './ramo';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';


@Injectable()
export class RamoService {

  private urlEndPoint:string = GlobalComponent.apiURL+'ramo';
  constructor(private http: HttpClient, private router: Router) { }


  getRamos() : Observable<Ramo[]> {
    return this.http.get<Ramo[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let ramos = response as Ramo[];
      return ramos.map(ramo => {
        ramo.nombre_ramo = ramo.nombre_ramo.toUpperCase();
        return ramo;
      });
    })
    );
  }

  create(ramo: Ramo) : Observable<Ramo> {
    return this.http.post(this.urlEndPoint, ramo).pipe(
      map((response:any) => response.ramo as Ramo),
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

  getRamo(id): Observable<Ramo> {
    return this.http.get<Ramo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/ramos']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(ramo: Ramo) : Observable<Ramo> {
    return this.http.put<Ramo>(`${this.urlEndPoint}/${ramo.id}`, ramo).pipe(
      map((response:any) => response.ramo as Ramo),
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

  delete(id: number): Observable<Ramo> {
    return this.http.delete<Ramo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
