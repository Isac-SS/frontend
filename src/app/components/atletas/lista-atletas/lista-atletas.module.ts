import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaAtletasComponent } from './lista-atletas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdicaoAtletaModule } from '../edicao-atleta/edicao-atleta.module';

@NgModule({
  declarations: [ListaAtletasComponent],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, EdicaoAtletaModule, FormsModule],
  exports: [ListaAtletasComponent],
})
export class ListaAtletasModule {}