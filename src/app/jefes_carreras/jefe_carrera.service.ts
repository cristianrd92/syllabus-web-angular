import { Injectable } from '@angular/core';

import { JefeCarrera } from './jefe_carrera';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Usuario } from '../usuarios/usuario';
import { Carrera } from '../carreras/carrera';
import { GlobalComponent } from '../global.component';


@Injectable()
export class JefeCarreraService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/jefe_carrera';
  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint + "/usuarios")
  }
  getCarreras(): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.urlEndPoint + "/carreras")
  }


  getJefesCarreras() : Observable<JefeCarrera[]> {
    return this.http.get<JefeCarrera[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let jefes_carreras = response as JefeCarrera[];
      return jefes_carreras.map(jefe_carrera => {
        return jefe_carrera;
      });
    })
    );
  }

  create(jefe_carrera: JefeCarrera) : Observable<JefeCarrera> {
    return this.http.post(this.urlEndPoint, jefe_carrera).pipe(
      map((response:any) => response.jefe_carrera as JefeCarrera),
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

  getJefeCarrera(id): Observable<JefeCarrera> {
    return this.http.get<JefeCarrera>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/jefesCarreras']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(jefe_carrera: JefeCarrera) : Observable<JefeCarrera> {
    return this.http.put<JefeCarrera>(`${this.urlEndPoint}/${jefe_carrera.id}`, jefe_carrera).pipe(
      map((response:any) => response.jefe_carrera as JefeCarrera),
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

  delete(id: number): Observable<JefeCarrera> {
    return this.http.delete<JefeCarrera>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
