import { Component, OnInit } from '@angular/core';
import { Sistema } from './sistema';
import { SistemaService } from './sistema.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sistema-form',
  templateUrl: './form.sistema.component.html',
})
export class FormSistemaComponent implements OnInit {

  public sistema: Sistema;
  public titulo:string = "Parametros del Sistema";
  public errores:string[];

  constructor(private sistemaService: SistemaService,
    public router: Router){ }

  ngOnInit(): void {
    this.cargarParametros()
  }

  cargarParametros(): void {
    this.sistemaService.getParametros().subscribe(parametros => {
      console.log(parametros)
      let datePipe = new DatePipe("es-CL")
      parametros.fecha = datePipe.transform(parametros.fecha,'yyyy-MM-dd')
      console.log(parametros.fecha)
      this.sistema = parametros
    })
  }

  update(): void{
    this.sistemaService.update(this.sistema)
    .subscribe(parametros => {
      this.router.navigate(['/home'])
      swal("Parametros actualizados", 'Parametros actualizados con exito', 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
      }
    )
  }

}
