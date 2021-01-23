import { Component, OnInit } from '@angular/core';
import { DetalleMallaCurricular } from './detalle_malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import { Ramo } from '../ramos/ramo';
import { MallaCurricular } from './malla_curricular';
import { Semestre } from '../semestres/semestre';
import { SemestreService } from '../semestres/semestre.service';
import { RamoService } from '../ramos/ramo.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.detalle_malla.editar.component.html',
})
export class FormDetalleMallaEditarComponent implements OnInit {
  public detalle_malla: DetalleMallaCurricular = new DetalleMallaCurricular()

  ramos: Ramo[];
  malla: MallaCurricular;
  public loading:boolean = false;
  semestres: Semestre[];
  public titulo:string = "Asignar Ramo a Malla"
  public errores:string[]

  constructor(private mallaService: MallaCurricularService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private auth: AuthService,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarMalla(),
    this.cargarRamos(),
    this.cargarSemestres()
  }

  cargarMalla(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo ="Editar Ramo Malla Carrera";
        this.mallaService.getMallaEditar(id).subscribe( (malla) => {
          this.detalle_malla = malla;
          this.loading=false;
        })
      }
    })
  }

  cargarRamos(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      this.malla = JSON.parse(localStorage.getItem('malla_obj'));
      this.mallaService.getRamosMalla(this.malla).subscribe(ramos => { 
        this.ramos = ramos 
      });
    });
  }
  cargarSemestres(): void {
    this.mallaService.getSemestres().subscribe(semestres =>{
      this.semestres = semestres;
    })
  }

  update(): void{
    this.loading=true;
    this.malla = JSON.parse(localStorage.getItem('malla_obj'));
    this.mallaService.updateDetalle(this.detalle_malla)
    .subscribe(malla => {
      if(this.auth.hasRole("ROLE_JEFE_CARRERA")){
        this.router.navigate(['/mallasCarrera/ramos/'+this.malla.id])
      }else{    
        this.router.navigate(['/mallas/ramos/'+this.malla.id])
      }
      this.loading=false;
      swal("Detalle malla actualizado", `Detalle malla actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    })
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
