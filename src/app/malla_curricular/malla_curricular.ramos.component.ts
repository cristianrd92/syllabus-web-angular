import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';
import { ActivatedRoute } from '@angular/router';
import { CarreraService } from '../carreras/carrera.service';
import { Ramo } from '../ramos/ramo';
import { DetalleMallaCurricular } from './detalle_malla_curricular';

@Component({
  selector: 'app-ciudades',
  templateUrl: './malla_curricular.ramos.component.html',
})
export class MallaCurricularRamosComponent implements OnInit {

  detalles: DetalleMallaCurricular[];
  malla: MallaCurricular;
  dtOptions: DataTables.Settings = {};

  constructor( private mallaService: MallaCurricularService ,
    public authService: AuthService,
    public carreraService: CarreraService,
    private activedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.mallaService.getMalla(id).subscribe(malla=>{
          this.malla = malla
          localStorage.setItem("malla_obj", JSON.stringify(malla))
        })
        this.mallaService.getDetalleMallaEliminar(id).subscribe(detalles=>{
          this.detalles = detalles
        })
      }
    })
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

  delete(detalle: DetalleMallaCurricular): void {
    swal({
      title: `Esta seguro que desea eliminar el ramo ${detalle.ramo.nombre_ramo} de esta malla?`,
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
        this.mallaService.deleteDetalle(detalle.id).subscribe(
          response => {
            this.detalles = this.detalles.filter(det => det !== detalle)
            swal(
              'Borrado!',
              'El ramo ha sido borrada de esta malla',
              'success'
              )
          }
        )
      }
    })
  }
}
