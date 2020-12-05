import { Injectable } from '@angular/core';

import { MallaCurricular } from './malla_curricular';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';


@Injectable()
export class MallaCurricularService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/malla';
  constructor(private http: HttpClient, private router: Router) { }


  getMallas() : Observable<MallaCurricular[]> {
    return this.http.get<MallaCurricular[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let mallas = response as MallaCurricular[];
      return mallas.map(malla => {
        malla.descripcion_malla = malla.descripcion_malla.toUpperCase();
        return malla;
      });
    })
    );
  }

  create(malla: MallaCurricular) : Observable<MallaCurricular> {
    return this.http.post(this.urlEndPoint, malla).pipe(
      map((response:any) => response.malla as MallaCurricular),
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

  getMalla(id): Observable<MallaCurricular> {
    return this.http.get<MallaCurricular>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/mallas']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(malla: MallaCurricular) : Observable<MallaCurricular> {
    return this.http.put<MallaCurricular>(`${this.urlEndPoint}/${malla.id}`, malla).pipe(
      map((response:any) => response.malla as MallaCurricular),
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

  delete(id: number): Observable<MallaCurricular> {
    return this.http.delete<MallaCurricular>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
