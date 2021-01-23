import { Component, OnInit } from '@angular/core';
import { Carrera } from '../carreras/carrera';
import { ComisionCarreraService } from '../carreras/comision/comision_carrera.service';
import { DatatablesEspaniol } from '../helper/datatables.component';
import { Revision } from '../ramos_docentes/revision';
import { AuthService } from '../usuarios/auth.service';
import { PlanificacionRevision } from './planificacion_revision';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html',
  styleUrls: ['./comision.component.css']
})
export class ComisionComponent implements OnInit {

  selectedItem: Carrera;
  carreras : Carrera[];
  public loading:boolean=false;
  syllabus: PlanificacionRevision[];
  constructor(private comisionService:ComisionCarreraService,
    public authService: AuthService) { }
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.loading=true;
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
    this.comisionService.getCarreras().subscribe( carreras => {
      this.carreras = carreras;
      this.loading=false;
    })
  }
  onOptionsSelected(value: string){
    if(value!="--- Seleccione una carrera ---"){
      this.loading=true;
      this.comisionService.getPlanificacionRevision(value).subscribe(resultado=>{
        this.syllabus = resultado;
        this.loading=false;
      })
    }else{
      this.syllabus = [];
    }
  }
}
