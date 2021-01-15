import { Injectable } from '@angular/core';

import { MallaCurricular } from './malla_curricular';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';
import { Ramo } from '../ramos/ramo';
import { DetalleMallaCurricular } from './detalle_malla_curricular';
import { MallaDetalle } from './malla_detalla';


@Injectable()
export class MallaCurricularService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/malla';
  constructor(private http: HttpClient, private router: Router) { }


  getMallas() : Observable<MallaCurricular[]> {
    return this.http.get<MallaCurricular[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let mallas = response as MallaCurricular[];
      return mallas.map(malla => {
        malla.descripcion_malla = malla.descripcion_malla.toUpperCase();
        return malla;
      });
    })
    );
  }

  getRamosMalla(malla:MallaCurricular): Observable<Ramo[]> {
    return this.http.get<Ramo[]>(`${this.urlEndPoint}/ramo/${malla.carrera.id}/${malla.id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }),
      map( (response) => {
        let ramos = response as Ramo[];
        return ramos.map(ramo => {
          return ramo;
        });
      })
    )
  }

  create(malla: MallaCurricular) : Observable<MallaCurricular> {
    return this.http.post(this.urlEndPoint, malla).pipe(
      map((response:any) => response.malla as MallaCurricular),
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
  crearDetalle(detalle: DetalleMallaCurricular) : Observable<DetalleMallaCurricular> {
    return this.http.post(`${this.urlEndPoint}/detalle`, detalle).pipe(
      map((response:any) => response.detalle as DetalleMallaCurricular),
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

  getMalla(id): Observable<MallaCurricular> {
    return this.http.get<MallaCurricular>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/mallas']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getMallaEditar(id): Observable<DetalleMallaCurricular> {
    return this.http.get<DetalleMallaCurricular>(`${this.urlEndPoint}/detalleEditar/${id}`).pipe(
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

  getDetalleMallaEliminar(id): Observable<DetalleMallaCurricular[]> {
    return this.http.get<DetalleMallaCurricular[]>(`${this.urlEndPoint}/detalle/${id}`).pipe(
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

  getDetalleMalla(id): Observable<MallaDetalle[]> {
    return this.http.get<MallaDetalle[]>(`${this.urlEndPoint}/malla/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }),
      map( (response) => {
        let ramos = response as MallaDetalle[];
        return ramos.map(detalle => {
          detalle.id = detalle[0]
          detalle.malla_curricular_id = detalle[1]
          detalle.ramo_id = detalle[2]
          detalle.semestre_id = detalle[3]
          detalle.posicion_ramo = detalle[4]
          detalle.malla_id = detalle[5]
          detalle.descripcion_malla = detalle[6]
          detalle.carrera_id = detalle[7]
          detalle.nombre_ramo = detalle[8]
          detalle.descripcion_semestre = detalle[9]
          detalle.posicion_semestre = detalle[10]
          detalle.nombre_usuario = detalle[11]
          detalle.estado = detalle[12]
          for (let index = 0; index < 13; index++) {
            delete detalle[index]          
          }
          return detalle;
        });
      })
    )
  }

  update(malla: MallaCurricular) : Observable<MallaCurricular> {
    return this.http.put<MallaCurricular>(`${this.urlEndPoint}/${malla.id}`, malla).pipe(
      map((response:any) => response.malla as MallaCurricular),
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

  updateDetalle(malla: DetalleMallaCurricular) : Observable<DetalleMallaCurricular> {
    return this.http.put<DetalleMallaCurricular>(`${this.urlEndPoint}/editar/${malla.id}`, malla).pipe(
      map((response:any) => response.malla as DetalleMallaCurricular),
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

  delete(id: number): Observable<MallaCurricular> {
    return this.http.delete<MallaCurricular>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
  deleteDetalle(id: number): Observable<DetalleMallaCurricular> {
    return this.http.delete<DetalleMallaCurricular>(`${this.urlEndPoint}/detalle/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

}
