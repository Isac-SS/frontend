import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListaEventosComponent } from './lista-eventos.component';
import { IonicModule } from '@ionic/angular';
// import { EdicaoEventoComponent } from '../edicao-evento/edicao-evento.component';



@NgModule({
  declarations: [ ListaEventosComponent ],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [ ListaEventosComponent],
  providers: [DatePipe],
})
export class ListaEventosModule {}