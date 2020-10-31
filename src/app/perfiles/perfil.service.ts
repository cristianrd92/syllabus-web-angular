import { Injectable } from '@angular/core';

import { Perfil } from './perfil';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';
import { Role } from '../roles/rol';


@Injectable()
export class PerfilService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/perfil';
  constructor(private http: HttpClient, private router: Router) { }

  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(this.urlEndPoint + "/roles").pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let roles = response as Role[];
      console.log(roles);
      return roles.map(role => {
        role.name = role.name.toUpperCase();
        return role;
      });
    })
    );
  }

  getPerfiles() : Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let perfiles = response as Perfil[];
      return perfiles.map(perfil => {
        perfil.name = perfil.name.toUpperCase();
        return perfil;
      });
    })
    );
  }

  create(facultad: Perfil) : Observable<Perfil> {
    return this.http.post(this.urlEndPoint, facultad).pipe(
      map((response:any) => response.facultad as Perfil),
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

  getPerfil(id): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.urlEndPoint}/${id}`).pipe(
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

  update(facultad: Perfil) : Observable<Perfil> {
    return this.http.put<Perfil>(`${this.urlEndPoint}/${facultad.id}`, facultad).pipe(
      map((response:any) => response.facultad as Perfil),
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

  delete(id: number): Observable<Perfil> {
    return this.http.delete<Perfil>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
