import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Carrera } from '../carreras/carrera';
import { RamoCarreraService } from '../ramos_carreras/ramo_carrera.service';
import { element } from 'protractor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormMallaCurricularComponent implements OnInit {
  public malla: MallaCurricular = new MallaCurricular()
  public titulo:string = "Crear Malla";
  public errores:string[];
  carreras: Carrera[];

  constructor(public authService:AuthService,
    private ramoCarreraService: RamoCarreraService,
    private mallaService: MallaCurricularService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarMalla(),
    this.cargarCarreras()
  }
  goBack(){
    this._location.back();
  }

  cargarCarreras(): void {
    this.ramoCarreraService.getCarreras().subscribe(carreras => 
      { 
        this.carreras = carreras;
      });
  }
  
  compararCarrera(o1:Carrera, o2:Carrera): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  cargarMalla(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.mallaService.getMalla(id).subscribe( (malla) => this.malla = malla)
      }
    })
  }

  create(): void{
    this.mallaService.create(this.malla)
    .subscribe(malla => {
      this.router.navigate(['/mallas'])
      swal("Nueva malla", `Malla creada ${malla.descripcion_malla} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.mallaService.update(this.malla)
    .subscribe(malla => {
      this.router.navigate(['/mallas'])
      swal("Malla actualizada", `Malla ${malla.descripcion_malla} actualizada con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
}
