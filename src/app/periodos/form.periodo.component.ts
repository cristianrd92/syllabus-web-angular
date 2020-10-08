import { Component, OnInit } from '@angular/core';
import { Periodo } from './periodo';
import { PeriodoService } from './periodo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.periodo.component.html',
})
export class FormPeriodoComponent implements OnInit {
  public periodo: Periodo = new Periodo()
  public titulo:string = "Crear Periodo"
  public errores:string[]

  constructor(private periodoService: PeriodoService,
    private router: Router,
    private activedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarPeriodo()
  }

  cargarPeriodo(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.periodoService.getPeriodo(id).subscribe( (periodo) => this.periodo = periodo)
      }
    })
  }

  create(): void{
    this.periodoService.create(this.periodo)
    .subscribe(periodo => {
      this.router.navigate(['/periodos'])
      swal("Nuevo periodo", `Periodo ${periodo.nombre_periodo} creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.periodoService.update(this.periodo)
    .subscribe(periodo => {
      this.router.navigate(['/periodos'])
      swal("Periodo actualizado", `Periodo ${periodo.nombre_periodo} actualizadp con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
}
