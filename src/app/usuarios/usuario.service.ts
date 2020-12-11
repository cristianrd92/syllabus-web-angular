import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global.component';
import { ChangePasswordForm } from './change.password';
import { Carrera } from '../carreras/carrera';


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

  getCarreras() : Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndPoint+'/carreras').pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      let carreras = response as Carrera[];
      return carreras.map(carrera => {
        carrera.nombre_carrera = carrera.nombre_carrera.toUpperCase();
        carrera.codigo_carrera = carrera.codigo_carrera.toUpperCase();
        return carrera;
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
  cambiarPassword(change: ChangePasswordForm) : Observable<ChangePasswordForm> {
    return this.http.post(this.urlEndPoint+"/cambiarClave", change).pipe(
      map((response:any) => response.change as ChangePasswordForm),
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
      map((response:any)=> {
        console.log(response);
        return response;
      }),
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
