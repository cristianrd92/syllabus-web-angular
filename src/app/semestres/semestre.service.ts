import { Injectable } from '@angular/core';

import { Semestre } from './semestre';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';

@Injectable()
export class SemestreService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/semestre';
  constructor(private http: HttpClient, private router: Router) { }


  getSemestres() : Observable<Semestre[]> {
    return this.http.get<Semestre[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let semestres = response as Semestre[];
      return semestres.map(semestre => {
        semestre.descripcion_semestre = semestre.descripcion_semestre.toUpperCase();
        return semestre;
      });
    })
    );
  }

  create(semestre: Semestre) : Observable<Semestre> {
    return this.http.post(this.urlEndPoint, semestre).pipe(
      map((response:any) => response.semestre as Semestre),
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

  getSemestre(id): Observable<Semestre> {
    return this.http.get<Semestre>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/semestres']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(semestre: Semestre) : Observable<Semestre> {
    return this.http.put<Semestre>(`${this.urlEndPoint}/${semestre.id}`, semestre).pipe(
      map((response:any) => response.semestre as Semestre),
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

  delete(id: number): Observable<Semestre> {
    return this.http.delete<Semestre>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
