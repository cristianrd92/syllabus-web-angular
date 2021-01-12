import { Component, OnInit } from '@angular/core';
import { DetalleMallaCurricular } from './detalle_malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import { Carrera } from '../carreras/carrera';
import { Usuario } from '../usuarios/usuario';
import { Ramo } from '../ramos/ramo';
import { MallaCurricular } from './malla_curricular';
import { Semestre } from '../semestres/semestre';
import { SemestreService } from '../semestres/semestre.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.detalle_malla.editar.component.html',
})
export class FormDetalleMallaEditarComponent implements OnInit {
  public detalle_malla: DetalleMallaCurricular = new DetalleMallaCurricular()

  private malla_id;
  ramos: Ramo[];
  malla: MallaCurricular;

  semestres: Semestre[];
  public titulo:string = "Editar Detalle Malla"
  public errores:string[]

  constructor(private mallaService: MallaCurricularService,
    private semestreService: SemestreService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarJefeCarrera(),
    this.cargarRamos(),
    this.cargarSemestres()
  }

  cargarJefeCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.titulo ="Editar Jefe Carrera";
        this.mallaService.getMallaEditar(id).subscribe( (malla) => {
          console.log(malla)
          this.detalle_malla = malla;
        })
      }
    })
  }

  cargarRamos(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      this.malla_id=id;
      this.malla = JSON.parse(localStorage.getItem('malla_obj'));
      this.mallaService.getRamosMalla(this.malla).subscribe(ramos => { 
      this.ramos = ramos 
      });
    });
}
cargarSemestres(): void {
  this.semestreService.getSemestres().subscribe(semestres =>{
    this.semestres = semestres;
  })
}

  update(): void{
    this.mallaService.updateDetalle(this.detalle_malla)
    .subscribe(malla => {
      this.router.navigate(['/mallas'])
      swal("Jefe carrera actualizada", `Jefe carrera actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
  goBack(){
    this._location.back();
  }
  compararRamo(o1:Ramo, o2:Ramo): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararSemestre(o1:Semestre, o2:Semestre): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
