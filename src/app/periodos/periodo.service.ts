import { Injectable } from '@angular/core';

import { Periodo } from './periodo';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class PeriodoService {

  private urlEndPoint:string = 'https://syllabus-api-rest.herokuapp.com/api/periodo';
  constructor(private http: HttpClient, private router: Router) { }


  getPeriodos() : Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let periodos = response as Periodo[];
      return periodos.map(periodo => {
        periodo.nombre_periodo = periodo.nombre_periodo.toUpperCase();
        return periodo;
      });
    })
    );
  }

  create(periodo: Periodo) : Observable<Periodo> {
    return this.http.post(this.urlEndPoint, periodo).pipe(
      map((response:any) => response.periodo as Periodo),
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

  getPeriodo(id): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/periodos']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(periodo: Periodo) : Observable<Periodo> {
    return this.http.put<Periodo>(`${this.urlEndPoint}/${periodo.id}`, periodo).pipe(
      map((response:any) => response.periodo as Periodo),
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

  delete(id: number): Observable<Periodo> {
    return this.http.delete<Periodo>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
