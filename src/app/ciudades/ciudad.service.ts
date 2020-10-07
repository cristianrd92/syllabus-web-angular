import { Injectable } from '@angular/core';

import { Ciudad } from './ciudad';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class CiudadService {

  private urlEndPoint:string = 'http://localhost:8080/api/ciudad';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean{
    console.log(e);
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true
    }
    return false
  }

  getCiudades() : Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
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
    return this.http.post(this.urlEndPoint, ciudad, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.ciudad as Ciudad),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        }


        swal(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }

  getCiudad(id): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/ciudades']);
        swal("Error al editar", e.error.mensaje, "error");
        return throwError(e);
      })
    )
  }

  update(ciudad: Ciudad) : Observable<Ciudad> {
    return this.http.put<Ciudad>(`${this.urlEndPoint}/${ciudad.id}`, ciudad, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.ciudad as Ciudad),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status==400){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Ciudad> {
    return this.http.delete<Ciudad>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }
}
