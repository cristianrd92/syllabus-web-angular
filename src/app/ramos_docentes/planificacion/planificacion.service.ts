import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global.component';
import { Planificacion } from './planificacion';


@Injectable()
export class PlanificacionService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/planificacion';
  constructor(private http: HttpClient, private router: Router) { }


  getPlanificaciones() : Observable<Planificacion[]> {
    return this.http.get<Planificacion[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      console.log(response)
      let ramos_carreras = response as Planificacion[];
      return ramos_carreras.map(ramo_carrera => {
        return ramo_carrera;
      });
    })
    );
  }

  create(ramo_carrera: Planificacion) : Observable<Planificacion> {
    return this.http.post(this.urlEndPoint, ramo_carrera).pipe(
      map((response:any) => response.ramo_carrera as Planificacion),
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

  getRamoCarrera(id): Observable<Planificacion> {
    return this.http.get<Planificacion>(`${this.urlEndPoint}/${id}`).pipe(
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

  update(ramo_carrera: Planificacion) : Observable<Planificacion> {
    return this.http.put<Planificacion>(`${this.urlEndPoint}/${ramo_carrera.id}`, ramo_carrera).pipe(
      map((response:any) => response.ramo_carrera as Planificacion),
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

  delete(id: number): Observable<Planificacion> {
    return this.http.delete<Planificacion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  subirArchivo(archivo: File, usuario_id, ramo_id){
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("usuario_id", usuario_id);
    formData.append("ramo_id", ramo_id)

    const req = new HttpRequest("POST", `${this.urlEndPoint}/upload`, formData,{
      reportProgress: true
    })
    return this.http.request(req)
  }
}
