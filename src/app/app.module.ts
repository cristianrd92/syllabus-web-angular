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
import { FormComisionComponent } from './comision/form.comision.component';
import { FormSistemaComponent } from './sistema/form.sistema.component';
import { SistemaService } from './sistema/sistema.service';

import { SanitizeHtmlPipe } from './helper/sanitize';
import { JefesCarrerasComponent } from './jefes_carreras/jefes-carreras.component';
import { FormJefeCarreraComponent } from './jefes_carreras/form.jefe_carrera.component';
import { JefeCarreraService } from './jefes_carreras/jefe_carrera.service';
import { FormDetalleMallaEditarComponent } from './malla_curricular/form.detalle_malla.editar.component';
import { MallaCarreraComponent } from './malla_curricular/malla_carrera/malla_carrera.component';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';

registerLocaleData(localeEs, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'ajustes', component:FormSistemaComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'usuarios/cambiarPassword', component:FormPasswordComponent},  

  //LISTO
  {path: 'ciudades', component:CiudadesComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_CIUDAD"}},
  {path: 'ciudades/form', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_CIUDAD"}},
  {path: 'ciudades/form/:id', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_CIUDAD"}},
  //LISTO
  {path: 'sedes', component:SedesComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_SEDE"}},
  {path: 'sedes/form', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_SEDE"}},
  {path: 'sedes/form/:id', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_SEDE"}},
  //LISTO
  {path: 'facultades', component:FacultadesComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_FACULTAD"}},
  {path: 'facultades/form', component:FormFacultadComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_FACULTAD"}},
  {path: 'facultades/form/:id', component:FormFacultadComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_FACULTAD"}},
  //LISTO
  {path: 'carreras', component:CarrerasComponent, canActivate: [AuthGuard, RoleGuard], data: {role:["ROLE_V_CARRERA"]}},
  {path: 'carreras/form', component:FormCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_CARRERA"}},
  {path: 'carreras/form/:id', component:FormCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:["ROLE_M_CARRERA"]}},
  //LISTO
  {path: 'periodos', component:PeriodosComponent, canActivate: [AuthGuard, RoleGuard], data: {role:["ROLE_V_PERIODO"]}},
  {path: 'periodos/form', component:FormPeriodoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_PERIODO"}},
  {path: 'periodos/form/:id', component:FormPeriodoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_PERIODO"}},
  //LISTO
  {path: 'ramos', component:RamosComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_RAMO"}},
  {path: 'ramos/form', component:FormRamoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_RAMO"}},
  {path: 'ramos/form/:id', component:FormRamoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_RAMO"}},
  //LISTO
  {path: 'ramosCarreras', component:RamosCarrerasComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_RAMO_CARRERA"}},
  {path: 'ramosCarreras/form', component:FormRamoCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_RAMO_CARRERA"}},
  {path: 'ramosCarreras/form/:id', component:FormRamoCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_RAMO_CARRERA"}},
  //LISTO
  {path: 'perfiles', component:PerfilesComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_PERFIL"}},
  {path: 'perfiles/form', component:FormPerfilComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_PERFIL"}},
  {path: 'perfiles/form/:id', component:FormPerfilComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_PERFIL"}},
  //LISTO
  {path: 'mallas', component:MallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_MALLA"}},
  {path: 'mallas/form', component:FormMallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_MALLA"}},
  {path: 'mallas/form/:id', component:FormMallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_MALLA"}},
  {path: 'mallas/ramos/:id', component:MallaCurricularRamosComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_MALLA"}},
  {path: 'mallas/ramos/asignar/:id', component:FormDetalleMallaComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_MALLA"}},  
  {path: 'mallas/ramos/editar/:id', component:FormDetalleMallaEditarComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_MALLA"}},
  {path: 'mallas/ver/:id', component:MallaCurricularVerComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_MALLA"}},
  //LISTO
  {path: 'mallasCarrera', component:MallaCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},
  {path: 'mallasCarrera/form', component:FormMallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},
  {path: 'mallasCarrera/form/:id', component:FormMallaCurricularComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},
  {path: 'mallasCarrera/ramos/:id', component:MallaCurricularRamosComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},
  {path: 'mallasCarrera/ramos/asignar/:id', component:FormDetalleMallaComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},  
  {path: 'mallasCarrera/ramos/editar/:id', component:FormDetalleMallaEditarComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},
  {path: 'mallasCarrera/ver/:id', component:MallaCurricularVerComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_JEFE_CARRERA"}},

  //LISTO
  {path: 'jefesCarreras', component:JefesCarrerasComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_JEFE_CARRERA"}},
  {path: 'jefesCarreras/form', component:FormJefeCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_JEFE_CARRERA"}},
  {path: 'jefesCarreras/form/:id', component:FormJefeCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_JEFE_CARRERA"}},

  //LISTO
  {path: 'semestres', component:SemestreComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_SEMESTRE"}},
  {path: 'semestres/form', component:FormSemestreComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_SEMESTRE"}},
  {path: 'semestres/form/:id', component:FormSemestreComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_SEMESTRE"}},
  //SYLLABUS SUBIDA Y REVISION LISTO
  {path: 'ramosDocentes', component:RamosDocentesComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_DOCENTE"}},
  {path: 'syllabusPendientes', component:ComisionComponent, data: {role:"ROLE_COMISION"}},
  {path: 'syllabusPendientes/form/:id', component:FormComisionComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_COMISION"}},
  //LISTO
  {path: 'usuarios', component:UsuariosComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_USUARIO"}},
  {path: 'usuarios/form', component:FormUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_M_USUARIO"}},
  {path: 'usuarios/form/:id', component:FormUsuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_E_USUARIO"}},
  
  {path: 'carreras/comision/:id', component:ComisionCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_V_COMISION"}},
  {path: 'carreras/comision/asignar/:id', component:FormComisionCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_C_COMISION"}},

]

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
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
    FormComisionComponent,
    FormSistemaComponent,
    JefesCarrerasComponent,
    FormJefeCarreraComponent,
    FormDetalleMallaEditarComponent,
    MallaCarreraComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.6)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'}),
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
              MallaCurricularService, SemestreService, SistemaService, JefeCarreraService,
             
  {provide: LOCALE_ID, useValue: 'es-CL'}, 
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
