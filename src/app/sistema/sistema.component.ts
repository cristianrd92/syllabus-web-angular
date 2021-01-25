import { Component, OnInit } from '@angular/core';
import { Carrera } from '../carreras/carrera';
import { ComisionCarreraService } from '../carreras/comision/comision_carrera.service';
import { DatatablesEspaniol } from '../helper/datatables.component';
import { Revision } from '../ramos_docentes/revision';
import { AuthService } from '../usuarios/auth.service';
import { Crud } from './crud';

@Component({
  selector: 'app-comision',
  templateUrl: './sistema.component.html'
})
export class ComisionComponent implements OnInit {

  selectedItem: Carrera;
  carreras : Carrera[];
  public loading:boolean=false;
  constructor(private comisionService:ComisionCarreraService,
    public authService: AuthService) { }
  dtOptions: DataTables.Settings = {};
  crud: Crud[];


  llenarCrud(){
    this.crud.push({id:1,nombre:"Usuario"})
    this.crud.push({id:1,nombre:"Semestre"})
    this.crud.push({id:1,nombre:"Sede"})
    this.crud.push({id:1,nombre:"Ramo"})
    this.crud.push({id:1,nombre:"Ramo Carrera"})
    this.crud.push({id:1,nombre:"Periodo"})
    this.crud.push({id:1,nombre:"Facultad"})
    this.crud.push({id:1,nombre:"Ciudad"})

  }

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
        // this.syllabus = resultado;
        this.loading=false;
      })
    }else{
      // this.syllabus = [];
    }
  }
}
