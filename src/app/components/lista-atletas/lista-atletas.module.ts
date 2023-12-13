import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaAtletasComponent } from './lista-atletas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EdicaoAtletaModule } from '../edicao-atleta/edicao-atleta.module';

@NgModule({
  declarations: [ListaAtletasComponent],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, EdicaoAtletaModule],
  exports: [ListaAtletasComponent],
})
export class ListaAtletasModule {}