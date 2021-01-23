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
import { MallaDetalle } from './malla_detalla';

@Component({
  selector: 'app-ciudades',
  templateUrl: './malla_curricular.ver.component.html',
})

export class MallaCurricularVerComponent implements OnInit {

  detalles: MallaDetalle[];
  malla: MallaCurricular;
  tabla = '';
  public loading:boolean = false;
  dtOptions: DataTables.Settings = {};

  constructor( private mallaService: MallaCurricularService ,
    public authService: AuthService,
    public carreraService: CarreraService,
    private activedRoute: ActivatedRoute,
    private sanitized: DomSanitizer
    ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.mallaService.getDetalleMalla(id).subscribe(detalles=>{
          this.detalles = detalles
          this.tablaMalla(detalles)
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
    let presente2 = 0;
    for (let t=0; t<detalles.length; t++){
      if(detalles[t].posicion_ramo > columna){
        columna = detalles[t].posicion_ramo
      }
      if(detalles[t].posicion_semestre > fila){
        fila = detalles[t].posicion_semestre
      }
    }
    this.tabla+='<table class="table cardnew table-responsive table-borderless">';
    this.tabla+='<thead><tr>'
    
    for (let t=0; t<detalles.length; t++){
      if(detalles[t].posicion_semestre != presente2){
        presente2 = detalles[t].posicion_semestre
        this.tabla+='<th scope="col">'+ detalles[t].descripcion_semestre +'</th>'
      }
    }
    this.tabla+='</tr></thead>'
    this.tabla+='<tbody>'
    for (let i = 1; i<=columna; i++){
      this.tabla += '<tr>'
      for (let j=1; j<fila+1; j++) {
        presente = 0;
        for (let t=0; t<detalles.length; t++){
          if(detalles[t].posicion_ramo == i && detalles[t].posicion_semestre == j){
            //this.tabla+='<td id="'+ i +'-'+ j +'">'+ detalles[t].nombre_ramo +'</td>';
            if(detalles[t].estado == "Aprobado"){
              this.tabla+='<td id="'+ i +'-'+ j +'"><div class="card" style="background-color:green;color:white;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">'
            }else if (detalles[t].estado == "No subido") {
              this.tabla+='<td id="'+ i +'-'+ j +'"><div class="card" style="background-color:#FACC2E;color:white;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">'
            } else if (detalles[t].estado == "Rechazado"){
              this.tabla+='<td id="'+ i +'-'+ j +'"><div class="card" style="background-color:red;color:white;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">'
            }else{
              this.tabla+='<td id="'+ i +'-'+ j +'"><div class="card" style="background-color:grey;color:white;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">'
            }
            this.tabla+='<div class="card-body">'
            this.tabla+='<h4 class="card-title">'+ detalles[t].nombre_ramo +'</h4>'
            this.tabla+='<p class="card-text">'+ detalles[t].nombre_usuario +'</p>'
            this.tabla+='<p class="card-text">'+ detalles[t].estado +'</p>'
            this.tabla+='</div></div></td>'
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
    this.loading=false;
  }
}
