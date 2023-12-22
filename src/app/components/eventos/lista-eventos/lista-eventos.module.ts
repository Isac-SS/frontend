import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListaEventosComponent } from './lista-eventos.component';
import { IonicModule } from '@ionic/angular';
import { EdicaoEventoComponent } from '../edicao-evento/edicao-evento.component';



@NgModule({
  declarations: [ ListaEventosComponent, EdicaoEventoComponent],
  imports: [IonicModule, CommonModule],
  exports: [ ListaEventosComponent],
  providers: [DatePipe],
})
export class ListaEventosModule {}