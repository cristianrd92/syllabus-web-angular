import { Component, OnInit } from '@angular/core';
import { Periodo } from './periodo';
import { PeriodoService } from './periodo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.periodo.component.html',
})
export class FormPeriodoComponent implements OnInit {
  public periodo: Periodo = new Periodo();
  public titulo:string = "Crear Periodo";
  public errores:string[];
  public loading:boolean=false;


  constructor(private periodoService: PeriodoService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarPeriodo()
  }
  goBack(){
    this._location.back();
  }

  cargarPeriodo(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.periodoService.getPeriodo(id).subscribe( (periodo) => {
          this.periodo = periodo;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.periodoService.create(this.periodo)
    .subscribe(periodo => {
      this.router.navigate(['/periodos'])
      this.loading=false;
      swal("Nuevo periodo", `Periodo ${periodo.nombre_periodo} creado con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.loading=true;
    this.periodoService.update(this.periodo)
    .subscribe(periodo => {
      this.router.navigate(['/periodos']);
      this.loading=false;
      swal("Periodo actualizado", `Periodo ${periodo.nombre_periodo} actualizadp con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    )
  }
}
