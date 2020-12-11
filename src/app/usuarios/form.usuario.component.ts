import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { Perfil } from '../perfiles/perfil';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Ciudad } from '../ciudades/ciudad';
import { Location } from '@angular/common';
import { PerfilService } from '../perfiles/perfil.service';
import { Carrera } from '../carreras/carrera';

@Component({
  selector: 'app-form',
  templateUrl: './form.usuario.component.html',
})
export class FormUsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario()
  perfiles: Perfil[];
  carreras: Carrera[];
  public titulo:string = "Crear Usuario"
  public errores:string[]
  esJefe:boolean;

  constructor(private usuarioService: UsuarioService,private perfilService: PerfilService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.esJefe=false;
    this.cargarUsuario(),
    this.cargarPerfiles(),
    this.cargarCarreras()
  }
  esJefeF(e) {
    this.esJefe = e.target.checked;
  }

  cargarCarreras(): void {
    this.usuarioService.getCarreras().subscribe(carreras=>{
      this.carreras = carreras;
    })
  }
  
  cargarPerfiles(): void {
    this.perfilService.getPerfiles().subscribe(perfiles => { this.perfiles = perfiles });
  }

  imprimirErrores(error){
    console.log(error);
  }

  cargarUsuario(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.titulo = "Editar Usuario";
        this.usuarioService.getUsuario(id).subscribe( (usuario) => {
          console.log(usuario.nombres)
          this.usuario = usuario
          this.usuario.perfiles.push(usuario.perfiles[0]); 
          console.log(this.usuario.perfil)
        })
      }
    })
  }

  create(): void{
    this.usuario.perfiles = this.usuario.perfil
    this.usuario.username = this.usuario.rut_usuario.slice(0,-1);
    this.usuarioService.create(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      swal("Nuevo usuario", `Usuario creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.usuarioService.update(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      swal("Usuario actualizado", `Usuario ${usuario.username} actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
  goBack(){
    this._location.back();
  }
  compararPerfil(o1:Perfil, o2:Perfil): boolean{
    
    console.log(o1)
    console.log(o2)

    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
