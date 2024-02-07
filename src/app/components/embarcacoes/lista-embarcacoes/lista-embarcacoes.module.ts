import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaEmbarcacoesComponent } from './lista-embarcacoes.component';



@NgModule({
  declarations: [ListaEmbarcacoesComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [ListaEmbarcacoesComponent]
})
export class listaEmbarcacoesModule { }
