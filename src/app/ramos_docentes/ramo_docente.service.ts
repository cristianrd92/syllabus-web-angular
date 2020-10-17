import { Injectable } from '@angular/core';

import { RamoCarrera } from './ramo_carrera';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Usuario } from '../usuarios/usuario';
import { Ramo } from '../ramos/ramo';
import { Periodo } from '../periodos/periodo';
import { Carrera } from '../carreras/carrera';
import { GlobalComponent } from '../global.component';


@Injectable()
export class RamoDocenteService {

  private urlEndPoint:string = GlobalComponent.apiURL+'api/ramo_carrera';
  constructor(private http: HttpClient, private router: Router) { }

  getRamosCarreras() : Observable<RamoCarrera[]> {
    return this.http.get<RamoCarrera[]>(this.urlEndPoint).pipe(
      catchError(e => {
        return throwError(e);
      }),
    map( (response) => {
      console.log(response)
      let ramos_carreras = response as RamoCarrera[];
      return ramos_carreras.map(ramo_carrera => {
        return ramo_carrera;
      });
    })
    );
  }
  
}
