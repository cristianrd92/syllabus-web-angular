import { Injectable } from '@angular/core';

import { Carrera } from './carrera';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Facultad } from '../facultades/facultad';
import { GlobalComponent } from '../global.component';


@Injectable()
export class CarreraService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/carrera';
  constructor(private http: HttpClient, private router: Router) { }

  getFacultades(): Observable<Facultad[]>{
    return this.http.get<Facultad[]>(this.urlEndPoint + "/facultades")
  }


  getCarreras() : Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let carreras = response as Carrera[];
      return carreras.map(carrera => {
        carrera.nombre_carrera = carrera.nombre_carrera.toUpperCase();
        return carrera;
      });
    })
    );
  }

  create(carrera: Carrera) : Observable<Carrera> {
    return this.http.post(this.urlEndPoint, carrera).pipe(
      map((response:any) => response.carrera as Carrera),
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

  getCarrera(id): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.urlEndPoint}/${id}`).pipe(
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

  getCarreraById(id): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(carrera: Carrera) : Observable<Carrera> {
    return this.http.put<Carrera>(`${this.urlEndPoint}/${carrera.id}`, carrera).pipe(
      map((response:any) => response.carrera as Carrera),
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

  delete(id: number): Observable<Carrera> {
    return this.http.delete<Carrera>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
