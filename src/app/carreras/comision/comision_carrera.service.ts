import { Injectable } from '@angular/core';

import { Comision } from './comision';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../../global.component';
import { Usuario } from 'src/app/usuarios/usuario';
import { Carrera } from '../carrera';
import { AuthService } from 'src/app/usuarios/auth.service';
import { PlanificacionRevision } from 'src/app/comision/planificacion_revision';
import { Planificacion } from 'src/app/ramos_docentes/planificacion/planificacion';
import { formatDate } from '@angular/common';
import { Revision } from 'src/app/ramos_docentes/revision';


@Injectable()
export class ComisionCarreraService {
  id:number;

  private urlEndPoint:string = GlobalComponent.apiURL+'api/usuariocomision';
  constructor(public authService: AuthService,private http: HttpClient, private router: Router) { }

  create(carrera: Comision) : Observable<Comision> {
    return this.http.post(this.urlEndPoint, carrera).pipe(
      map((response:any) => response.carrera as Comision),
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
  crearRevision(revision: Revision) : Observable<Revision> {
    return this.http.post(this.urlEndPoint+'/revision', revision).pipe(
      map((response:any) => response.carrera as Revision),
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

  getComisiones(id): Observable<Comision[]> {
    return this.http.get<Comision[]>(`${this.urlEndPoint}/${id}`).pipe(
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

  getCarreras(): Observable<Carrera[]> {
    this.id = this.authService.usuario.id
    return this.http.get<Carrera[]>(`${this.urlEndPoint}/carreras/${this.id}`).pipe(
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

  getPlanificacionRevision(id): Observable<PlanificacionRevision[]>{
    return this.http.get<PlanificacionRevision[]>(`${this.urlEndPoint}/syllabus/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }),map( (response) => {
        let revision = response as PlanificacionRevision[];
        return revision.map(syllabus => {
          syllabus.planificacion = syllabus[0]
          syllabus.revision = syllabus[1]
          for (let index = 0; index < 2; index++) {
            delete syllabus[index]          
          }
          return syllabus;
        });
      })
    )
  }

  getUsuarios(id): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlEndPoint}/listado/${id}`).pipe(
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

  getPlanificacion(id): Observable<Planificacion> {
    return this.http.get<Planificacion>(`${this.urlEndPoint}/planificacion/${id}`).pipe(
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

  delete(id: number): Observable<Comision> {
    return this.http.delete<Comision>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
