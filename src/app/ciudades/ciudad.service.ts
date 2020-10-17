import { Injectable } from '@angular/core';

import { Ciudad } from './ciudad';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';


@Injectable()
export class CiudadService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/ciudad';
  constructor(private http: HttpClient, private router: Router) { }


  getCiudades() : Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let ciudades = response as Ciudad[];
      return ciudades.map(ciudad => {
        ciudad.nombre_ciudad = ciudad.nombre_ciudad.toUpperCase();
        return ciudad;
      });
    })
    );
  }

  create(ciudad: Ciudad) : Observable<Ciudad> {
    return this.http.post(this.urlEndPoint, ciudad).pipe(
      map((response:any) => response.ciudad as Ciudad),
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

  getCiudad(id): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/ciudades']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(ciudad: Ciudad) : Observable<Ciudad> {
    return this.http.put<Ciudad>(`${this.urlEndPoint}/${ciudad.id}`, ciudad).pipe(
      map((response:any) => response.ciudad as Ciudad),
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

  delete(id: number): Observable<Ciudad> {
    return this.http.delete<Ciudad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
