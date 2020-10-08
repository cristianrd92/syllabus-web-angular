import { Injectable } from '@angular/core';

import { Facultad } from './facultad';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Sede } from '../sedes/sede';


@Injectable()
export class FacultadService {

  private urlEndPoint:string = 'http://localhost:8080/api/facultad';
  constructor(private http: HttpClient, private router: Router) { }

  getSedes(): Observable<Sede[]>{
    return this.http.get<Sede[]>(this.urlEndPoint + "/sedes")
  }


  getFacultades() : Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let facultades = response as Facultad[];
      return facultades.map(facultad => {
        facultad.nombre_facultad = facultad.nombre_facultad.toUpperCase();
        return facultad;
      });
    })
    );
  }

  create(facultad: Facultad) : Observable<Facultad> {
    return this.http.post(this.urlEndPoint, facultad).pipe(
      map((response:any) => response.facultad as Facultad),
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

  getFacultad(id): Observable<Facultad> {
    return this.http.get<Facultad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/facultades']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(facultad: Facultad) : Observable<Facultad> {
    return this.http.put<Facultad>(`${this.urlEndPoint}/${facultad.id}`, facultad).pipe(
      map((response:any) => response.facultad as Facultad),
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

  delete(id: number): Observable<Facultad> {
    return this.http.delete<Facultad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
