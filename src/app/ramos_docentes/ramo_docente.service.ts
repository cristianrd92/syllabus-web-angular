import { Injectable } from '@angular/core';

import { RamoCarrera } from './ramo_carrera';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { GlobalComponent } from '../global.component';
import { AuthService } from '../usuarios/auth.service';


@Injectable()
export class RamoDocenteService {

  constructor(private http: HttpClient, private router: Router, public authService: AuthService) { }
  private urlEndPoint:string = GlobalComponent.apiURL+'api/ramos_docente/'+this.authService.usuario.id;
  
  getRamosCarreras() : Observable<RamoCarrera[]> {
    return this.http.get<RamoCarrera[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    );
  }

}
