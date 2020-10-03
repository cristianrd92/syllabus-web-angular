import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';


import { Docente } from './docente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class DocenteService {

  private urlEndPoint:string = 'http://localhost:8080/api/docentes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getDocentes() : Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlEndPoint).pipe(
    map( (response) => {
      let docentes = response as Docente[];
      return docentes.map(docente => {

        docente.nombre = docente.nombre.toUpperCase();
        //docente.apellido = docente.apellido.toUpperCase();
        let datePipe = new DatePipe('es-CL');
        //docente.createdAt = datePipe.transform(docente.createdAt, 'EEEE dd, MMMM yyyy');
        return docente;
      });
    })
    );
  }

  create(docente: Docente) : Observable<Docente> {
    return this.http.post(this.urlEndPoint, docente, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.docente as Docente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }


        swal(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }

  getDocente(id): Observable<Docente> {
    return this.http.get<Docente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/docentes']);
        swal("Error al editar", e.error.mensaje, "error");
        return throwError(e);
      })
    )
  }

  update(docente: Docente) : Observable<Docente> {
    return this.http.put<Docente>(`${this.urlEndPoint}/${docente.id}`, docente, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.docente as Docente),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Docente> {
    return this.http.delete<Docente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    )
  }
}
