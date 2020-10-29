import { Injectable } from '@angular/core';

import { Role } from './rol';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';


@Injectable()
export class RolService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/rol';
  constructor(private http: HttpClient, private router: Router) { }


  getPerfiles() : Observable<Role[]> {
    return this.http.get<Role[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let perfiles = response as Role[];
      return perfiles.map(perfil => {
        perfil.name = perfil.name.toUpperCase();
        return perfil;
      });
    })
    );
  }

  create(facultad: Role) : Observable<Role> {
    return this.http.post(this.urlEndPoint, facultad).pipe(
      map((response:any) => response.facultad as Role),
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

  getPerfil(id): Observable<Role> {
    return this.http.get<Role>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/perfiles']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(facultad: Role) : Observable<Role> {
    return this.http.put<Role>(`${this.urlEndPoint}/${facultad.id}`, facultad).pipe(
      map((response:any) => response.facultad as Role),
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

  delete(id: number): Observable<Role> {
    return this.http.delete<Role>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
