import { Component, OnInit } from '@angular/core';
import { Ramo } from './ramo';
import { RamoService } from './ramo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.ramo.component.html',
})
export class FormRamoComponent implements OnInit {
  public ramo: Ramo = new Ramo()
  public titulo:string = "Crear Ramo"
  public errores:string[]
  public loading:boolean=false;

  constructor(private ramoService: RamoService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarRamo()
  }

  goBack(){
    this._location.back();
  }

  cargarRamo(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo = "Editar Ramo"
        this.ramoService.getRamo(id).subscribe( (ramo) => {
          this.ramo = ramo;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.ramoService.create(this.ramo)
    .subscribe(ramo => {
      this.router.navigate(['/ramos'])
      this.loading=false;
      swal("Nuevo ramo", `Ramo ${ramo.nombre_ramo} creado con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.loading=true;
    this.ramoService.update(this.ramo)
    .subscribe(ramo => {
      this.router.navigate(['/ramos'])
    this.loading=false;
      swal("Ramo actualizado", `Ramo ${ramo.nombre_ramo} actualizado con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    })
  }
}
