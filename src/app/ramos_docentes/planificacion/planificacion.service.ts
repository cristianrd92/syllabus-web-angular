import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/app/global.component';
import { Planificacion } from './planificacion';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Revision } from '../revision';


@Injectable()
export class PlanificacionService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/planificacion';
  constructor(private http: HttpClient, private router: Router,
    private auth: AuthService) { }

  getPlanificacionesEstado() : Observable<Object[]> {
    return this.http.get<Object[]>(`${this.urlEndPoint}/estado/${this.auth.usuario.id}`).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let revision = response as Object[];
      return revision.map(
        function (revision) {
        return revision;
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
    //const options = { responseType: 'blob' }; there is no use of this
        // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
        return this.http.get(`${this.urlEndPoint}/upload/ver/${nombre_archivo}`, { responseType: 'blob' });
  }
  
}
