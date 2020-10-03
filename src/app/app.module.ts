import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { DocentesComponent } from './docentes/docentes.component';
import { DocenteService } from './docentes/docente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './docentes/form.component';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es-CL';


registerLocaleData(localeEs, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'directivas', component:DirectivaComponent},
  {path: 'docentes', component:DocentesComponent},
  {path: 'docentes/form', component:FormComponent},
  {path: 'docentes/form/:id', component:FormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    DocentesComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [DocenteService, {provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
