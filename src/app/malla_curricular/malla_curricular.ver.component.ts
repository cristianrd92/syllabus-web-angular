import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';
import { ActivatedRoute } from '@angular/router';
import { CarreraService } from '../carreras/carrera.service';
import { Ramo } from '../ramos/ramo';
import { DetalleMallaCurricular } from './detalle_malla_curricular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ciudades',
  templateUrl: './malla_curricular.ver.component.html',
})

export class MallaCurricularVerComponent implements OnInit {

  detalles: DetalleMallaCurricular[];
  malla: MallaCurricular;
  tabla = '';
  dtOptions: DataTables.Settings = {};

  constructor( private mallaService: MallaCurricularService ,
    public authService: AuthService,
    public carreraService: CarreraService,
    private activedRoute: ActivatedRoute,
    private sanitized: DomSanitizer
    ) { }

  html:SafeHtml;

  ngOnInit() {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.mallaService.getDetalleMalla(id).subscribe(detalles=>{
          console.log(detalles)
          this.tablaMalla(detalles)
          this.detalles = detalles
        })
      }
    })
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  tablaMalla(detalles){
    let fila=0;
    let columna=0;
    let presente = 0;
    for (let t=0; t<detalles.length; t++){
      if(detalles[t].posicion > columna){
        columna = detalles[t].posicion
      }
      if(detalles[t].semestre.posicion > fila){
        fila = detalles[t].semestre.posicion
      }
    }
    console.log(fila);
    console.log(columna);
    this.tabla+='<table class="table cardnew table-responsive">';
    this.tabla+='<thead><tr>'
    // for (let i = 0; i<=columna-1; i++){
    //   this.tabla+='<th scope="col">'+ detalles[i].semestre.descripcion_semestre +'</th>'
    // }
    this.tabla+='<th scope="col">Primer Semestre</th>'
    this.tabla+='<th scope="col">Segundo Semestre</th>'
    this.tabla+='</tr></thead>'
    this.tabla+='<tbody>'
    for (let i = 1; i<=columna; i++){
      this.tabla += '<tr>'
      for (let j=1; j<fila+1; j++) {
        presente = 0;
        for (let t=0; t<detalles.length; t++){
          if(detalles[t].posicion == i && detalles[t].semestre.posicion == j){
            this.tabla+='<td id="'+ i +'-'+ j +'">'+ detalles[t].ramo.nombre_ramo +'</td>';
            presente = 1;
          }
        }
        if(presente == 0){
          this.tabla+='<td id="'+ i +'-'+ j +'"></td>';
        }
      }
      this.tabla+='</tr>'
    }
    this.tabla+='</tbody></table>'
    
  }
}
