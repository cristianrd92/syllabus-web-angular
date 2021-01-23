import { Component, OnInit } from '@angular/core';
import { Comision } from './comision';
import swal from 'sweetalert2';
import { DatatablesEspaniol } from '../../helper/datatables.component';
import { ComisionCarreraService } from './comision_carrera.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Carrera } from '../carrera';
import { CarreraService } from '../carrera.service';

@Component({
  selector: 'app-comision-carrera',
  templateUrl: './comision_carrera.component.html',
})
export class ComisionCarreraComponent implements OnInit {

  comisiones: Comision[];
  carrera: Carrera;
  dtOptions: DataTables.Settings = {};
  public loading:boolean=false;

  constructor( 
    private comisionService: ComisionCarreraService,
    private carreraService: CarreraService,
    public authService: AuthService,
    private activedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.carreraService.getCarrera(id).subscribe( carrera => {
          this.carrera = carrera;
          localStorage.setItem("carrera_obj", JSON.stringify(carrera))
        })
        this.comisionService.getComisiones(id).subscribe( (comisiones) => {
          this.comisiones = comisiones;
          this.loading=false;
        })
      }
    })
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
    
  }

  delete(comision: Comision): void {
    swal({
      title: `Esta seguro que desea eliminar a ${comision.usuario.nombres} de la comisión?`,
      text: "Esto no se podra revertir",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.comisionService.delete(comision.id).subscribe(
          response => {
            this.comisiones = this.comisiones.filter(com => com !== comision)
            this.loading=false;
            swal(
              'Borrado!',
              'El usuario ha sido borrada de la comisión',
              'success'
              )
          }
        )
      }
    })
  }

}
