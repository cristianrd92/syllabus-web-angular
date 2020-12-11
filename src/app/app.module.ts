import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { CiudadService } from './ciudades/ciudad.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './ciudades/form.component';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es-CL';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { SedeService } from './sedes/sede.service';
import { SedesComponent } from './sedes/sedes.component';
import { FormSedeComponent } from './sedes/form.sede.component';
import { FormFacultadComponent } from './facultades/form.facultad.component';
import { FacultadesComponent } from './facultades/facultades.component';
import { FacultadService } from './facultades/facultad.service';
import { CarrerasComponent } from './carreras/carreras.component';
import { FormCarreraComponent } from './carreras/form.carrera.component';
import { CarreraService } from './carreras/carrera.service';
import { PeriodosComponent } from './periodos/periodos.component';
import { FormPeriodoComponent } from './periodos/form.periodo.component';
import { PeriodoService } from './periodos/periodo.service';
import { RamosComponent } from './ramos/ramos.component';
import { FormRamoComponent } from './ramos/form.ramo.component';
import { RamoService } from './ramos/ramo.service';
import { RamosCarrerasComponent } from './ramos_carreras/ramos-carreras.component';
import { FormRamoCarreraComponent } from './ramos_carreras/form.ramo_carrera.component';
import { RamoCarreraService } from './ramos_carreras/ramo_carrera.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { RamosDocentesComponent } from './ramos_docentes/ramos-docentes.component';
import { RamoDocenteService } from './ramos_docentes/ramo_docente.service';
import { PlanificacionComponent } from './ramos_docentes/planificacion/planificacion.component';
import { PlanificacionService } from './ramos_docentes/planificacion/planificacion.service';
import { DetallesComponent } from './ramos_docentes/planificacion/detalles.component';
import { ComisionComponent } from './comision/comision.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { FormPerfilComponent } from './perfiles/form.perfil.component';
import { PerfilService } from './perfiles/perfil.service';
import { RolService } from './roles/rol.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './usuarios/usuario.service';
import { FormUsuarioComponent } from './usuarios/form.usuario.component';
import { Ng9RutModule } from 'ng9-rut';
import { ComisionCarreraComponent } from './carreras/comision/comision_component.component';
import { ComisionCarreraService } from './carreras/comision/comision_carrera.service';
import { FormComisionCarreraComponent } from './carreras/comision/form.comision_carrera.component';
import { MallaCurricularComponent } from './malla_curricular/malla_curricular.component';
import { MallaCurricularRamosComponent } from './malla_curricular/malla_curricular.ramos.component';
import { FormMallaCurricularComponent } from './malla_curricular/form.component';
import { MallaCurricularService } from './malla_curricular/malla_curricular.service';
import { SemestreComponent } from './semestres/semestre.component';
import { FormSemestreComponent } from './semestres/form.component';
import { SemestreService } from './semestres/semestre.service';
import { FormPasswordComponent } from './usuarios/form.password.component';
import { FormDetalleMallaComponent } from './malla_curricular/form.detalle_malla';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MallaCurricularVerComponent } from './malla_curricular/malla_curricular.ver.component';
import { CardComponent } from './malla_curricular/card.component';


registerLocaleData(localeEs, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'ciudades', component:CiudadesComponent},
  {path: 'ciudades/form', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ciudades/form/:id', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'sedes', component:SedesComponent},
  {path: 'sedes/form', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'sedes/form/:id', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'facultades', component:FacultadesComponent},
  {path: 'facultades/form', component:FormFacultadComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'facultades/form/:id', component:FormFacultadComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'carreras', component:CarrerasComponent},
  {path: 'carreras/form', component:FormCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'carreras/form/:id', component:FormCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'periodos', component:PeriodosComponent},
  {path: 'periodos/form', component:FormPeriodoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'periodos/form/:id', component:FormPeriodoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramos', component:RamosComponent},
  {path: 'ramos/form', component:FormRamoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramos/form/:id', component:FormRamoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramosCarreras', component:RamosCarrerasComponent},
  {path: 'ramosCarreras/form', component:FormRamoCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramosCarreras/form/:id', component:FormRamoCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramosDocentes', component:RamosDocentesComponent},
  {path: 'syllabusPendientes', component:ComisionComponent},
  {path: 'perfiles', component:PerfilesComponent},
  {path: 'perfiles/form', component:FormPerfilComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'perfiles/form/:id', component:FormPerfilComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'mallas', component:MallaCurricularComponent},
  {path: 'mallas/form', component:FormMallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'mallas/form/:id', component:FormMallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'mallas/ramos/:id', component:MallaCurricularRamosComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'mallas/ramos/asignar/:id', component:FormDetalleMallaComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'mallas/ver/:id', component:MallaCurricularVerComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},

  {path: 'semestres', component:SemestreComponent},
  {path: 'semestres/form', component:FormSemestreComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'semestres/form/:id', component:FormSemestreComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  


  {path: 'usuarios', component:UsuariosComponent},
  {path: 'usuarios/form', component:FormUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'usuarios/form/:id', component:FormUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'usuarios/cambiarPassword', component:FormPasswordComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  
  {path: 'carreras/comision/:id', component:ComisionCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'carreras/comision/asignar/:id', component:FormComisionCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CiudadesComponent,
    SedesComponent,
    FacultadesComponent,
    CarrerasComponent,
    PeriodosComponent,
    RamosComponent,
    RamosCarrerasComponent,
    RamosDocentesComponent,
    FormComponent,
    FormSedeComponent,
    FormFacultadComponent,
    FormCarreraComponent,
    FormPeriodoComponent,
    FormRamoComponent,
    FormRamoCarreraComponent,
    LoginComponent,
    HomeComponent,
    PlanificacionComponent,
    DetallesComponent,
    ComisionComponent,
    PerfilesComponent,
    FormPerfilComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    ComisionCarreraComponent,
    FormComisionCarreraComponent,
    MallaCurricularComponent,
    FormMallaCurricularComponent,
    SemestreComponent,
    FormSemestreComponent,
    FormPasswordComponent,
    MallaCurricularRamosComponent,
    MallaCurricularVerComponent,
    FormDetalleMallaComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgSelect2Module,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FlexLayoutModule, 
    Ng9RutModule
  ],
  providers: [CiudadService, SedeService, FacultadService, CarreraService, PeriodoService, 
              RamoService, RamoCarreraService, RamoDocenteService, PlanificacionService,
              PerfilService, RolService, UsuarioService, ComisionCarreraService,
              MallaCurricularService, SemestreService,
             
  {provide: LOCALE_ID, useValue: 'es-CL'}, 
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
