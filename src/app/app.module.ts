import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { CiudadService } from './ciudades/ciudad.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './ciudades/form.component';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es-CL';
import { LoginComponent } from './usuarios/login.component';


registerLocaleData(localeEs, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'directivas', component:DirectivaComponent},
  {path: 'ciudades', component:CiudadesComponent},
  {path: 'ciudades/form', component:FormComponent},
  {path: 'ciudades/form/:id', component:FormComponent},
  {path: 'login', component:LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    CiudadesComponent,
    FormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [CiudadService, {provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
