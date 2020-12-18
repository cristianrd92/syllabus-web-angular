import { Injectable } from '@angular/core';

import { Sistema } from './sistema';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';

@Injectable()
export class SistemaService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/sistema';
  constructor(private http: HttpClient, private router: Router) { }

  getParametros(): Observable<Sistema> {
    return this.http.get<Sistema>(`${this.urlEndPoint}`).pipe(
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

  update(parametros: Sistema) : Observable<Sistema> {
    return this.http.put<Sistema>(`${this.urlEndPoint}`, parametros).pipe(
      map((response:any) => response.sistema as Sistema),
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
}
