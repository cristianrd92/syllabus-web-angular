import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import { RamoCarreraEstado } from '../ramo_carrera_estado';
import { ModalService } from './modal.service';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {

  @Input() ramoEstado: RamoCarreraEstado;
  titulo: "Detalles revisión";
  constructor( public authService: AuthService, 
    public modalService: ModalService) { }

  ngOnInit() { 
    this.titulo = "Detalles revisión"; 
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
