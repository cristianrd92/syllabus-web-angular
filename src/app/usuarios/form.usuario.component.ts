import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { Perfil } from '../perfiles/perfil';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Ciudad } from '../ciudades/ciudad';
import { Location } from '@angular/common';
import { PerfilService } from '../perfiles/perfil.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.usuario.component.html',
})
export class FormUsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario()
  perfiles: Perfil[];
  public titulo:string = "Crear Usuario"
  public errores:string[]

  constructor(private usuarioService: UsuarioService,private perfilService: PerfilService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarUsuario(),
    this.cargarPerfiles()
  }

  cargarPerfiles(): void {
    this.perfilService.getPerfiles().subscribe(perfiles => { this.perfiles = perfiles });
  }

  cargarUsuario(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.titulo = "Editar Usuario";
        this.usuarioService.getUsuario(id).subscribe( (usuario) => {
          console.log(usuario.nombres)
          this.usuario = usuario
          this.usuario.perfil = usuario.perfiles[0];
          console.log(this.usuario.perfil)
        })
      }
    })
  }

  create(): void{
    this.usuarioService.create(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/sedes'])
      swal("Nuevo usuario", `Usuario ${usuario.username} creado con exito`, 'success')
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
