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
import { HomeModule } from './home/home.module';
import { EdicaoAtletaComponent } from './components/edicao-atleta/edicao-atleta.component';


//material
import { MatToolbarModule } from '@angular/material/toolbar';

//components
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EdicaoAtletaComponent
  ],
  imports: [
    HomeModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatTableModule,
    MatListModule,
    ReactiveFormsModule,
    MatToolbarModule,
    

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AtletasService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
