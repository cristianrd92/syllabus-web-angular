import { Component, OnInit } from '@angular/core';
import { Docente } from './docente';
import { DocenteService } from './docente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public docente: Docente = new Docente()
  public titulo:string = "Crear Docente"
  public errores:string[]

  constructor(private docenteService: DocenteService,
    private router: Router,
    private activedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarDocente()
  }

  cargarDocente(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.docenteService.getDocente(id).subscribe( (docente) => this.docente = docente)
      }
    })
  }

  create(): void{
    this.docenteService.create(this.docente)
    .subscribe(docente => {
      this.router.navigate(['/docentes'])
      swal("Nuevo docente", `Docente creado ${docente.nombre} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.docenteService.update(this.docente)
    .subscribe(docente => {
      this.router.navigate(['/docentes'])
      swal("Docente actualizado", `Docente ${docente.nombre} actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
}
