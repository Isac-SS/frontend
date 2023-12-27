import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AtletasService } from './shared/services/atletas/atletas.service';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from './components/header/header.component';


//material
import { MatToolbarModule } from '@angular/material/toolbar';

//components
import { HomeModule } from './components/home/home.module';
import { EdicaoAtletaComponent } from './components/atletas/edicao-atleta/edicao-atleta.component';
import { CriacaoAtletaComponent } from './components/atletas/criacao-atleta/criacao-atleta.component';
import { ListaEventosModule } from './components/eventos/lista-eventos/lista-eventos.module'; 
import { CriacaoEventoComponent } from './components/eventos/criacao-evento/criacao-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EdicaoAtletaComponent,
    CriacaoAtletaComponent,
    CriacaoEventoComponent
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatTableModule,
    MatListModule,
    ReactiveFormsModule,
    MatToolbarModule,
    ListaEventosModule,
    HomeModule
    

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AtletasService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
