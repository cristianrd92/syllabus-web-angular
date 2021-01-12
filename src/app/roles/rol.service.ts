import { Injectable } from '@angular/core';

import { Permiso } from './rol';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';


@Injectable()
export class RolService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/role';
  constructor(private http: HttpClient, private router: Router) { }


  getRoles() : Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      console.log(response)
      let roles = response as Permiso[];
      return roles.map(role => {
        role.name = role.name.toUpperCase();
        return role;
      });
    })
    );
  }

  create(facultad: Permiso) : Observable<Permiso> {
    return this.http.post(this.urlEndPoint, facultad).pipe(
      map((response:any) => response.facultad as Permiso),
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

  getRole(id): Observable<Permiso> {
    return this.http.get<Permiso>(`${this.urlEndPoint}/${id}`).pipe(
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

  update(facultad: Permiso) : Observable<Permiso> {
    return this.http.put<Permiso>(`${this.urlEndPoint}/${facultad.id}`, facultad).pipe(
      map((response:any) => response.facultad as Permiso),
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

  delete(id: number): Observable<Permiso> {
    return this.http.delete<Permiso>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
