import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false;
  modalD: boolean = false;

  constructor() { }

  abrirModal(){
    this.modal = true
  }

  cerrarModal(){
    this.modal = false
  }

  abrirModalD(){
    this.modalD = true
  }

  cerrarModalD(){
    this.modalD = false
  }
}
