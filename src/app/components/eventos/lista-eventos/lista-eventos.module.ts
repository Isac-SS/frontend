import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from './lista-eventos.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ ListaEventosComponent],
  imports: [IonicModule, CommonModule],
  exports: [ ListaEventosComponent],
})
export class ListaEventosModule {}