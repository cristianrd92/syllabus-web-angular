import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Perfil } from '../perfiles/perfil';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';


@Injectable()
export class UsuarioService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/usuario';
  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios() : Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let usuarios = response as Usuario[];
      return usuarios.map(usuario => {
        usuario.nombres = usuario.nombres.toUpperCase();
        return usuario;
      });
    })
    );
  }

  create(usuario: Usuario) : Observable<Usuario> {
    return this.http.post(this.urlEndPoint, usuario).pipe(
      map((response:any) => response.usuario as Usuario),
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

  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/usuarios']);
          console.error(e.error.mensaje);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  update(usuario: Usuario) : Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario).pipe(
      map((response:any) => response.usuario as Usuario),
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

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
