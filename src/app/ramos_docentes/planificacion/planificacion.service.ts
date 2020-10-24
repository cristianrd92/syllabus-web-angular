import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global.component';
import { Planificacion } from './planificacion';
import { AuthService } from 'src/app/usuarios/auth.service';
import { RamoCarreraEstado } from '../ramo_carrera_estado';


@Injectable()
export class PlanificacionService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/planificacion';
  constructor(private http: HttpClient, private router: Router,
    private auth: AuthService) { }

  getPlanificacionesEstado() : Observable<RamoCarreraEstado[]> {
    return this.http.get<RamoCarreraEstado[]>(`${this.urlEndPoint}/estado/${this.auth.usuario.id}`).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let revision = response as RamoCarreraEstado[];
      return revision.map(ramo_carrera => {
        ramo_carrera.ramo_carrera = ramo_carrera[0]
        ramo_carrera.re_estado = ramo_carrera[1]
        ramo_carrera.pla_fecha_subida = ramo_carrera[2]
        ramo_carrera.pla_ruta = ramo_carrera[3]
        ramo_carrera.pla_id = ramo_carrera[4]
        ramo_carrera.re_comentarios = ramo_carrera[5]
        for (let index = 0; index < 6; index++) {
          delete ramo_carrera[index]          
        }
        console.log(ramo_carrera)
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

  public getPDF(nombre_archivo): Observable<Blob> {   
    return this.http.get(`${this.urlEndPoint}/upload/ver/${nombre_archivo}`, 
    { responseType: 'blob' });
  }
  
}
