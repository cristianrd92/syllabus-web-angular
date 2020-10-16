import { Injectable } from '@angular/core';

import { RamoCarrera } from './ramo_carrera';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Usuario } from '../usuarios/usuario';
import { Ramo } from '../ramos/ramo';
import { Periodo } from '../periodos/periodo';
import { Carrera } from '../carreras/carrera';


@Injectable()
export class RamoCarreraService {

  private urlEndPoint:string = 'https://syllabus-api-rest.herokuapp.com/api/ramo_carrera';
  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint + "/usuarios")
  }
  getPeriodos(): Observable<Periodo[]>{
    return this.http.get<Periodo[]>(this.urlEndPoint + "/periodos")
  }
  getRamos(): Observable<Ramo[]>{
    return this.http.get<Ramo[]>(this.urlEndPoint + "/ramos")
  }
  getCarreras(): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.urlEndPoint + "/carreras")
  }


  getRamosCarreras() : Observable<RamoCarrera[]> {
    return this.http.get<RamoCarrera[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      console.log(response)
      let ramos_carreras = response as RamoCarrera[];
      return ramos_carreras.map(ramo_carrera => {
        return ramo_carrera;
      });
    })
    );
  }

  create(ramo_carrera: RamoCarrera) : Observable<RamoCarrera> {
    return this.http.post(this.urlEndPoint, ramo_carrera).pipe(
      map((response:any) => response.ramo_carrera as RamoCarrera),
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

  getRamoCarrera(id): Observable<RamoCarrera> {
    return this.http.get<RamoCarrera>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/ramosCarreras']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(ramo_carrera: RamoCarrera) : Observable<RamoCarrera> {
    return this.http.put<RamoCarrera>(`${this.urlEndPoint}/${ramo_carrera.id}`, ramo_carrera).pipe(
      map((response:any) => response.ramo_carrera as RamoCarrera),
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

  delete(id: number): Observable<RamoCarrera> {
    return this.http.delete<RamoCarrera>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
